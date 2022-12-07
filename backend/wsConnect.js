import {QuestionModel, PlayerModel} from './models/gamebox';
console.log(QuestionModel, PlayerModel);
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

const random = async (GameBoxName) => {
    random_list[GameBoxName] = await QuestionModel.aggregate([ { $sample: { size: 5 } } ])
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
                    console.log(typeof name);
                    let me = await PlayerModel.findOne({name});
                    console.log(me);
                    let player = await PlayerModel.findOne({'waiting': true});
                    console.log(player);
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
                        round[GameBoxName] = 1;
                        await random(GameBoxName);
                        sendData({'task': 'start', 'payload': {'participant': true, 'Img': random_list[GameBoxName][0].Img}}, GameBoxes[GameBoxName]);
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
                    if(answer.includes(body)){
                        round[GameBoxName] += 1
                        if(round[GameBoxName] === 6){
                            await PlayerModel.updateMany({'group':GameBoxName }, {$set: {'group': ''}});
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': random_list[GameBoxName][0].Img, 'over': true}}, GameBoxes[GameBoxName]);
                            sendStatus({'type' : true}, [ws]);
                            if (ws.box !== "" && GameBoxes[ws.box])
                                GameBoxes[ws.box].clear();
                        }else{
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': random_list[GameBoxName][round[GameBoxName] - 1].Img}}, GameBoxes[GameBoxName]);
                            sendStatus({'type' : true}, [ws]);
                        }
                    }else{
                        sendStatus({'type' : false}, [ws]);
                    }
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