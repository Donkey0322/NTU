import { useGame } from "./hooks/useGame";
import gif from "../img/giphy.gif";
import EndPage from "./EndPage";
import {
  GameBackground,
  Player,
  PlayerHead,
  ScoreBar,
  Score,
  QuestionImg,
  Black,
  Roulette,
  MainWrapper,
  Option,
} from "./hooks/useUI";
import useUX, { fadesOut, fadesIn } from "./hooks/useUX";

const GameRoom = () => {
  const {
    status,
    me,
    Img,
    myPoint,
    yourPoint,
    option,
    over,
    point,
    sendGuess,
  } = useGame();
  const { step1, black1, step2, black2, step3, step4 } = useUX();

  return (
    <>
      {step1 && <GameBackground></GameBackground>}
      {black1 && <Black zIndex={1}></Black>}
      {step2 && (
        <MainWrapper zIndex={2}>
          <Player style={{ left: "5vmin" }}>
            <PlayerHead gif={gif} style={{ top: "5vmin" }}></PlayerHead>
            <ScoreBar>
              <Score color="orange" score={myPoint}></Score>
            </ScoreBar>
          </Player>
          <Player style={{ right: "5vmin" }}>
            <PlayerHead
              gif={
                "https://media0.giphy.com/media/cdhHG6aUtCCWY/giphy.gif?cid=ecf05e4752ajm2l3c8smaw281eqn7wrl41gh1xclvgkq5ht4&rid=giphy.gif&ct=g"
              }
              style={{ top: "5vmin" }}
            ></PlayerHead>
            <ScoreBar>
              <Score color="aqua" score={yourPoint}></Score>
            </ScoreBar>
          </Player>
          {step4 && (
            <>
              <QuestionImg
                img={Img}
                animation={step4 === 2 ? fadesOut : fadesIn}
              />
              <Option
                me={me}
                option={option}
                point={point}
                handleGuess={sendGuess}
                status={status}
                animation={step4 === 2 ? fadesOut : fadesIn}
              />
            </>
          )}
        </MainWrapper>
      )}
      {(black2 || over) && (
        <Black
          zIndex={3}
          animation={black2 === 2 && !over ? fadesOut : fadesIn}
        ></Black>
      )}
      {step3 && (
        <MainWrapper zIndex={4}>
          <Roulette animation={step3 === 2 ? fadesOut : fadesIn}></Roulette>
        </MainWrapper>
      )}
      {over && (
        <MainWrapper zIndex={5}>
          <EndPage></EndPage>
        </MainWrapper>
      )}
    </>
  );
};
export default GameRoom;
