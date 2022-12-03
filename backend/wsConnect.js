import {QuestionModel, PlayerModel} from './models/chatbox.js';
const GameBoxes= {};
const round = {};
let waiting_ws = '';

const sendData = (data, ws) => {
    const arrayWs = Array.from(ws);
    for(let i = 0; i < arrayWs.length; i++){
        arrayWs[i].send(JSON.stringify(data));
    }
};
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws); 
};

// const random = () => {

// }

const makeName = (name, to) => { return [name, to].sort().join('_'); };

export default {  
    onMessage: (wss, ws) => (
        async (byteString) => {
            const {data} = byteString;
            const {type, payload}  = JSON.parse(data);
            switch (type) {
                // case 'input': {
                //     const { name, body } = msg.payload;
                //     const newMessage = new Message({name, body});
                //     console.log("Created", newMessage);
                //     try {
                //         await newMessage.save();
                //     }
                //     catch (e) { 
                //         ("Message DB save error: " + e);
                //     } 
                //     broadcastMessage(wss, ['output', [payload]], {type: 'success', msg: 'Message sent.'});
                    // sendData(['output', [payload]], ws);
                    // sendStatus({
                    //     type: 'success',
                    //     msg: 'Message sent.'
                    // }, ws);
                //     break;
                // }
                case 'start': {
                    const { name } = payload;
                    let me = await PlayerModel.findOne({name});
                    let player = await PlayerModel.findOne({'waiting': true});
                    if(!me){
                        me = await new PlayerModel({ name }).save();
                    }
                    if(player){
                        const GameBoxName = makeName(name, player);
                        GameBoxes[GameBoxName].add(ws);
                        GameBoxes[GameBoxName].add(waiting_ws);
                        ws.box = GameBoxName;
                        waiting_ws.box = GameBoxName;
                        await PlayerModel.updateOne({'name':name }, {'name':name, 'waiting':false});
                        await PlayerModel.updateOne({'name':player }, {'name':player, 'waiting':false});
                        round[GameBoxName] = 1;
                        sendData(['start', [{'participant': true}]], GameBoxes[GameBoxName]);
                    }else{
                        waiting_ws = ws
                        await PlayerModel.updateOne({'name':name }, {'name':name, 'waiting':true});
                        sendData(['start', [{'participant': false}]], [ws]);
                    }

                    // if (ws.box !== "" && chatBoxes[ws.box])
                    //     chatBoxes[ws.box].delete(ws);
                    // if (!chatBoxes[chatBoxName])
                    //     chatBoxes[chatBoxName] = new Set();

                    // let arr = [];
                    // var result = await validateChatBox(chatBoxName, [name, to]);
                    // for(var i = 0; i < result.messages.length; i++){
                    //     arr.push({body: result.messages[i].body, name: result.messages[i].sender});
                    // }
                    // sendData(['chat', arr], [ws]);
                    break;
                }
                case 'guess': {
                    const { name, body } = payload;
                    if(body === )
                    sendData(['output', [{'body': body, 'name': name}]], chatBoxes[chatBoxName]);
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, [ws]);
                }
                default: 
                    break;
            }
        }
    )
}