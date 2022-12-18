import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useGame } from "./useGame";

let rolled = false;
const rollit = keyframes`
  0%{ 
    bottom: 0;
	  opacity: 1;}
  50%{opacity: 1;}
	80%{opacity:0;}
	100%{ 
		bottom: 1500px;
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

const useRoulette = ({ animation }) => {
  const { me, sendTheme, theme } = useGame();
  const ITEMS_LIST = ["爸爸媽媽", "後宮甄嬛傳", "Kpop"];
  const RO_UL = ".roulette ul";
  const NUM_OF_ITEMS = ITEMS_LIST.length;

  function wait(func, s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        func();
        resolve(s * 1000);
      }, s * 1000);
    });
  }

  const rolling = async () => {
    renderList(40);
    const rollboard = document.querySelector(RO_UL);
    rollboard.classList.remove("fadesIn");
    await wait(function () {
      // const rollboard = document.querySelector(RO_UL);
      rollboard.classList.add("roll");
    }, 0.2);
    await wait(function () {
      rollboard.classList.remove("roll");
      empty(rollboard);
    }, 2);
    await wait(function () {
      renderElement("li", theme, RO_UL);
      rollboard.classList.add("fadesIn");
    }, 0);
    await wait(function () {
      sendTheme(me);
      rolled = false;
    }, 0.5);
  };

  function empty(element) {
    while (element.firstElementChild) {
      // console.log(element.firstElementChild);
      element.firstElementChild.remove();
    }
  }

  function renderElement(el, item, selector) {
    let listElement = document.createElement(el);
    let innerText = document.createTextNode(item);
    listElement.appendChild(innerText);
    document.querySelector(selector).appendChild(listElement);
  }

  function renderList(num = 1) {
    for (let j = 0; j < num; j++) {
      for (let i = 0; i < NUM_OF_ITEMS; i++) {
        renderElement("li", ITEMS_LIST[i], RO_UL);
      }
    }
  }

  // window.addEventListener("load", renderList);
  useEffect(() => {
    if (!rolled) {
      rolling();
      rolled = true;
    }
  }, []);
  return (
    <Roulette className="roulette" animation={animation}>
      <ul></ul>
    </Roulette>
  );
};

export default useRoulette;
