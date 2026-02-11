import styled from "styled-components";
import GameBackgroundImg from "../img/pexels-geraud-pfeiffer-6605306.jpg";

export const Home = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  display: flex;
  position: relative;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${GameBackgroundImg});
  /* z-index: -1; */
`;
