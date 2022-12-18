import styled, { keyframes } from "styled-components";

const rollit = keyframes`
  0%{ 
    bottom: 0;
	  opacity: 1;}
  50%{opacity: 1;}
	80%{opacity:0;}
	100%{ 
		bottom: 500px;
		opacity:0;
	}
`;
const fadesIn = keyframes`
	0%{opacity: 0}
	100%{opacity: 1}
`;

const Roulette = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60vmin;
  height: 25vmin;
  position: absolute;
  color: white;
  top: 10vh;
  border-radius: 100px;
  background: linear-gradient(135deg, #ff359b, #fffd87);
  overflow-y: hidden;
  animation: ${({ animation }) => animation} 0.5s ease forwards;
  ul {
    padding: 0;
    margin: 0;
    bottom: 0px;
    position: relative;
    transition: all 0.3s ease;
    li {
      font-size: 8vmin;
      /* line-height: 3rem; */
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  .roll {
    bottom: 0;
    animation: ${rollit} 2s ease-in;
  }
  .fadesIn {
    animation: ${fadesIn} 1s ease;
  }
`;

const Rolette = () => {
  return <div>Rolette</div>;
};

export default Rolette;
