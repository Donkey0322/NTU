import { QuestionModel, PlayerModel } from "./models/gamebox";
const GameBoxes = {};
const round = {};
let waiting_ws = "";
let random_list = {};
const theme = ["爸爸媽媽", "後宮甄嬛傳", "Kpop"];

const sendData = (data, ws) => {
  const arrayWs = Array.from(ws);
  for (let i = 0; i < arrayWs.length; i++) {
    arrayWs[i].send(JSON.stringify(data));
  }
};
const sendStatus = (payload, ws) => {
  sendData({ task: "status", payload }, ws);
};

const random = async (GameBoxName, theme) => {
  random_list[GameBoxName] = await QuestionModel.aggregate([
    { $match: { theme: { $elemMatch: { $eq: theme } } } },
    { $sample: { size: 5 } },
  ]);
};

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getTheme() {
  const n = Math.floor(Math.random() * theme.length);
  return theme[n];
}

export default {
  onMessage: (wss, ws) => async (byteString) => {
    const { data } = byteString;
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case "start": {
        const { name } = payload;
        ws.name = name;
        let me = await PlayerModel.findOne({ name });
        let player = await PlayerModel.findOne({ waiting: true });
        if (!me) {
          me = await new PlayerModel({ name }).save();
        }
        if (player) {
          const GameBoxName = makeName(name, player.name);
          if (!GameBoxes[GameBoxName]) GameBoxes[GameBoxName] = new Set();
          GameBoxes[GameBoxName].add(ws);
          GameBoxes[GameBoxName].add(waiting_ws);
          ws.box = GameBoxName;
          waiting_ws.box = GameBoxName;
          await PlayerModel.updateOne(
            { name: name },
            { name: name, waiting: false, group: GameBoxName }
          );
          await PlayerModel.updateOne(
            { name: player.name },
            { name: player.name, waiting: false, group: GameBoxName }
          );

          const theme = getTheme();
          await random(GameBoxName, theme);


          sendData(
            { task: "start", payload: { participant: true, theme } },
            GameBoxes[GameBoxName]
          );
        } else {
          waiting_ws = ws;
          await PlayerModel.updateOne(
            { name: name },
            { name: name, waiting: true }
          );
          sendData(
            {
              task: "start",
              payload: { participant: false },
            },
            [ws]
          );
        }
        break;
      }
      case "guess": {
        const { name, body } = payload;
        console.log(name, body);
        const me = await PlayerModel.findOne({ name: name });
        const GameBoxName = me.group;
        const answer =
          random_list[GameBoxName][round[GameBoxName] - 1].answer[0];
        if (answer === body) {
          round[GameBoxName] += 1;
          if (round[GameBoxName] === 6) {
            sendData(
              { task: "guess", payload: { winner: name, Img: "", over: true } },
              GameBoxes[GameBoxName]
            );
            sendStatus({ type: true }, [ws]);
            if (ws.box !== "" && GameBoxes[ws.box]) GameBoxes[ws.box].clear();
          } else {
            let Img = random_list[GameBoxName][round[GameBoxName] - 1].Img;
            console.log(random_list[GameBoxName][round[GameBoxName] - 1]);
            let choices =
              random_list[GameBoxName][round[GameBoxName] - 1].choices;
            choices = shuffle(choices);
            sendStatus({ answer: body, status: true }, [ws]);
            sendData(
              {
                task: "guess",
                payload: { winner: name, Img: Img, choices: choices },
              },
              GameBoxes[GameBoxName]
            );
          }
        } else {
          sendStatus({ answer: body, status: false }, [ws]);
        }
        break;
      }
      case "theme": {
        const { name } = payload;
        const me = await PlayerModel.findOne({ name: name });
        const GameBoxName = me.group;
        round[GameBoxName] = 1;
        let choices = random_list[GameBoxName][0].choices;
        choices = shuffle(choices);
        console.log(random_list[GameBoxName], choices);
        sendData(
          {
            task: "theme",
            payload: { Img: random_list[GameBoxName][0].Img, choices },
          },
          GameBoxes[GameBoxName]
        );
        break;
      }
    }
  },

  onClose: (wss, ws) => async (byteString) => {
    const name = ws.name;
    console.log(name);
    await PlayerModel.updateOne({ name }, { name, waiting: false });
  },
};
