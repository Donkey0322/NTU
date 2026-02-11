import styled from "styled-components";
import { fadesIn } from "./useUX";
import GameBackgroundImg from "../../img/photo-1451187580459-43490279c0fa.webp";

export { default as Roulette } from "./useRoulette";

export { default as Option } from "../../components/Options";

export const GameBackground = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  display: flex;
  position: relative;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${GameBackgroundImg});
  animation: ${({ animation = fadesIn }) => animation} 0.5s ease forwards;
  z-index: -1;
`;
export const Player = styled.div`
  width: 25vmin;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  animation: ${({ animation = fadesIn }) => animation} 0.5s ease forwards;
`;
export const PlayerHead = styled.div`
  width: 25vmin;
  height: 25vmin;
  border: 3px white solid;
  border-radius: 10px;
  position: absolute;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ gif }) => gif});
  animation: ${({ animation = fadesIn }) => animation} 0.5s ease forwards;
`;
export const ScoreBar = styled.div`
  width: 12vmin;
  height: 70vh;
  position: absolute;
  border: 3px gray solid;
  border-radius: 2vmin;
  bottom: -5vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
  animation: ${({ animation = fadesIn }) => animation} 0.5s ease forwards;
`;
export const Score = styled.button`
  width: 12vmin;
  height: ${({ score }) => score * 15}vh;
  position: absolute;
  bottom: -5vh;
  background-color: ${({ color }) => color};
  overflow: hidden;
  transition: all 0.5s;
  animation: ${({ animation = fadesIn }) => animation} 0.5s ease forwards;
`;
export const QuestionImg = styled.div`
  width: 60vmin;
  height: 60vmin;
  max-width: 40vw;
  max-height: 40vw;
  border-radius: 10px;
  position: absolute;
  top: 4vh;
  animation: ${({ animation = fadesIn }) => animation(1)} 0.5s ease forwards;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ img }) => img});
`;
export const Black = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  flex-direction: row;
  opacity: 0.5;
  animation: ${({ animation = fadesIn }) => animation(0.6)} 0.5s ease forwards;
  z-index: ${({ zIndex }) => zIndex};
`;
export const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};
`;
