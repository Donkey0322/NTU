import { useState, useEffect } from "react";
import { keyframes } from "styled-components";
import { useGame } from "./useGame";

export const fadesIn = (opacity = 1) => keyframes`
	0%{opacity: 0}
	100%{opacity: ${opacity}}
`;

export const fadesOut = (opacity = 1) => keyframes`
	from {
    opacity: ${opacity};
  }
  to {
    opacity: 0;
  }
`;

let init = 0;

const useUX = () => {
  const [init, setInit] = useState(0);
  const [step1, setStep1] = useState(false);
  //背景照片 load
  const [black1, setBlack1] = useState(false);
  //黑屏 1
  const [step2, setStep2] = useState(false);
  //玩家、分數條
  const [black2, setBlack2] = useState(false);
  //黑屏 2
  const [step3, setStep3] = useState(false);
  //轉盤
  const [step4, setStep4] = useState(false);
  //題目
  const { participant, signedIn, winner, setWinner, option, over } = useGame();

  function wait(func, s, value = true) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        func(value);
        resolve(s * 1000);
      }, s * 1000);
    });
  }

  useEffect(() => {
    async function IntialUX() {
      await wait(setStep1, 0);
      await wait(setBlack1, 0.8);
      await wait(setStep2, 0.8);
      await wait(setBlack2, 0.8);
      await wait(setStep3, 0.8);
      await wait(setStep3, 5, 2);
      await wait(setBlack2, 0.8, 2);
      wait(setStep3, 0.8, false);
      wait(setBlack2, 0.8, false);
      wait(setStep4, 2);
      // wait(setStep4, 5, 2);
    }
    if (!init && signedIn && participant) {
      IntialUX();
      console.log("開始");
      setInit(1);
    }
  }, [wait]);

  useEffect(() => {
    async function Transition_fadeOut() {
      await wait(setStep4, 1, 2);
      setWinner(null);
      console.log("轉場out", init);
    }
    if (init && winner && !over) {
      Transition_fadeOut();
    }
  }, [winner]);

  useEffect(() => {
    async function Transition_fadeIn() {
      wait(setStep4, 0.8, 2);
    }
    if (init > 1 && option.length && !over) {
      setStep4(1);
      console.log("轉場In", init);
    } else if (init === 1 && option.length) {
      setInit(init + 1);
    }
  }, [option]);

  useEffect(() => {
    if (init > 1 && !over) {
      setInit(0);
      setStep1(false);
      setBlack1(false);
      setStep2(false);
      setBlack2(false);
      setStep3(false);
      setStep4(false);
    }
  }, [over]);
  return { step1, black1, step2, black2, step3, step4 };
};

export default useUX;
