import {QuestionModel, PlayerModel} from './models/gamebox';
const GameBoxes= {};
const round = {};
let waiting_ws = '';
let random_list = {};

const sendData = (data, ws) => {
    const arrayWs = Array.from(ws);
    for(let i = 0; i < arrayWs.length; i++){
        arrayWs[i].send(JSON.stringify(data));
    }
};
const sendStatus = (payload, ws) => {
    sendData({'task':"status", payload}, ws); 
};

const random = async (GameBoxName, option) => {
    random_list[GameBoxName] = await QuestionModel.aggregate([
                                                            { $match: { theme: option } },
                                                            { $sample: { size: 5 } } ])
}

const makeName = (name, to) => { return [name, to].sort().join('_'); };

export default {  
    onMessage: (wss, ws) => (
        async (byteString) => {
            const {data} = byteString;
            const {type, payload}  = JSON.parse(data);
            switch (type) {
                case 'start': {
                    const { name } = payload;
                    let me = await PlayerModel.findOne({name});
                    let player = await PlayerModel.findOne({'waiting': true});
                    if(!me){
                        me = await new PlayerModel({ name }).save();
                    }
                    if(player){
                        const GameBoxName = makeName(name, player.name);
                        if (!GameBoxes[GameBoxName])
                            GameBoxes[GameBoxName] = new Set();
                        GameBoxes[GameBoxName].add(ws);
                        GameBoxes[GameBoxName].add(waiting_ws);
                        ws.box = GameBoxName;
                        waiting_ws.box = GameBoxName;
                        await PlayerModel.updateOne({'name':name }, {'name':name, 'waiting':false, 'group': GameBoxName});
                        await PlayerModel.updateOne({'name':player.name }, {'name':player.name, 'waiting':false, 'group': GameBoxName});
                        sendData({'task': 'start', 'payload': {'participant': true}}, GameBoxes[GameBoxName]);

                    }else{
                        waiting_ws = ws
                        await PlayerModel.updateOne({'name':name }, {'name':name, 'waiting':true});
                        sendData({'task':'start', 'payload':{'participant': false}}, [ws]);
                    }
                    break;
                }
                case 'guess': {
                    const { name, body } = payload;
                    const me = await PlayerModel.findOne({'name': name});
                    const GameBoxName = me.group;
                    const answer = random_list[GameBoxName][round[GameBoxName] - 1].answer;
                    if(answer === body){
                        round[GameBoxName] += 1
                        if(round[GameBoxName] === 6){
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': "", 'over': true}}, GameBoxes[GameBoxName]);
                            sendStatus({'type' : true}, [ws]);
                            if (ws.box !== "" && GameBoxes[ws.box])
                                GameBoxes[ws.box].clear();
                        }else{
                            let Img =  random_list[GameBoxName][round[GameBoxName] - 1].Img;
                            let choices = random_list[GameBoxName][round[GameBoxName] - 1].choices;
                            shuffle(choices);
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': Img, 'choices': choices}}, GameBoxes[GameBoxName]);
                            sendStatus({'type' : true}, [ws]);
                        }
                    }else{
                        sendStatus({'type' : false}, [ws]);
                    }
                }
                case "option": {
                    const {name, option} = payload
                    const me = await PlayerModel.findOne({'name': name});
                    const GameBoxName = me.group;
                    round[GameBoxName] = 1;
                    await random(GameBoxName, option);
                    let choices = random_list[GameBoxName][0].choices;
                    console.log(choices)
                    shuffle(choices);
                    console.log(choices)
                    sendData({'task': 'option', 'payload': {'Img': random_list[GameBoxName][0].Img, 'choices': choices}}, GameBoxes[GameBoxName]);
                }
                case 'stopWait': {
                    const {name} = payload;
                    const me = await PlayerModel.findOne({'name': name});
                    await PlayerModel.updateOne({'name': name}, {$set: {'waiting': false}});
                }
                default: 
                    break;
            }
        }
    )
}