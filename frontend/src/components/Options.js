import styled from "styled-components";
import { fadesIn } from "../containers/hooks/useUX";

const ButtonWrapper = styled.div`
  animation: ${({ animation = fadesIn }) => animation(1)} 0.5s ease forwards;
  margin: 0;
  width: 40vw;
  height: 30vh;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-wrap: wrap;
  gap: 5vmin 5vmin;
  align-content: center;
  bottom: 3vh;
`;

const OptionButton = styled.button`
  width: 15vw;
  height: 10vh;
  color: white;
  border-style: double;
  background-color: ${({ status }) => {
    return status === "normal" ? "cornflowerblue" : status ? "#00FF01" : "red";
  }};
  font-size: ${({ fontsize }) => fontsize}vmin;
  /* font-size: 2vmin; */
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: ${({ status }) => {
      return status === "normal" ? "darkblue" : status ? "#00FF01" : "red";
    }};
  }
`;

const Option = ({ me, option, handleGuess, status, point, animation }) => {
  return (
    <ButtonWrapper animation={animation}>
      {option.map((e, index) => (
        <OptionButton
          disabled={!point}
          fontsize={10 / e.length < 2.5 ? 2.5 : 10 / e.length}
          status={e === status.answer ? status.status : "normal"}
          onClick={() => {
            console.log(e);
            handleGuess(me, e);
          }}
          key={index}
        >
          {e}
        </OptionButton>
      ))}
    </ButtonWrapper>
  );
};

export default Option;
