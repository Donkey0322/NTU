import {QuestionModel, PlayerModel} from './models/chatbox.js';
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

const random = (GameBoxName) => {
    random_list[GameBoxName] = QuestionModel.aggregate([ { $sample: { size: 5 } } ])
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
                        const GameBoxName = makeName(name, player);
                        if (!GameBoxes[GameBoxName])
                            GameBoxes[GameBoxName] = new Set();
                        GameBoxes[GameBoxName].add(ws);
                        GameBoxes[GameBoxName].add(waiting_ws);
                        ws.box = GameBoxName;
                        waiting_ws.box = GameBoxName;
                        await PlayerModel.updateOne({'name':name }, {'name':name, 'waiting':false, 'group': GameBoxName});
                        await PlayerModel.updateOne({'name':player }, {'name':player, 'waiting':false, 'group': GameBoxName});
                        round[GameBoxName] = 1;
                        random(GameBoxName);
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
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': random_list[GameBoxName][0].Img, 'over': true}}, chatBoxes[chatBoxName]);
                            sendStatus({'type' : true}, [ws]);
                            if (ws.box !== "" && GameBoxes[ws.box])
                                GameBoxes[ws.box].clear();
                        }else{
                            sendData({'task':'guess', 'payload': {'winner': name, 'Img': random_list[GameBoxName][round[GameBoxName] - 1].Img}}, chatBoxes[chatBoxName]);
                            sendStatus({'type' : true}, [ws]);
                        }
                    }else{
                        sendStatus({'type' : false}, [ws]);
                    }
                }
                default: 
                    break;
            }
        }
    )
}