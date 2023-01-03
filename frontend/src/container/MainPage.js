import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
const SlideWidth = "100vmin";

const AutoSlide = styled.div`
  position: relative;
  width: ${SlideWidth};
  overflow: hidden;
  box-shadow: 0 0 30px black;
  margin-top: 1vmin;
  &:hover {
    label {
      opacity: 0.5;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  ul {
    position: relative;
    list-style: none;
    width: 10000%;
    transition: all 750ms ease;
    left: 0;
  }
  label {
    opacity: 0;
    width: 8vmin;
    height: 8vmin;
    background-color: black;
    text-align: center;
    color: white;
    font-size: large;
    position: absolute;
    top: 50%;
    font-size: 2vmin;
    transform: translateY(-50%);
    transition: all 0.5 ease;
    &:hover {
      opacity: 1;
    }
  }
`;

const SlideImg = styled.li`
  position: relative;
  display: list-item;
  float: left;
  width: ${SlideWidth};
  height: 40vmin;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ img }) => img});
`;

const Arrow = ({ icon, style, onClick }) => {
  return (
    <IconButton sx={{ ...style }} component="label" onClick={onClick}>
      {icon}
    </IconButton>
  );
};

const MainPage = () => {
  const [style, setStyle] = useState({});
  const [sliderWidth, setSliderWidth] = useState(0);
  const [count, setCount] = useState(1);
  const [items, setItems] = useState(4);

  const ref = useRef(null);
  useEffect(() => {
    setSliderWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, [nextSlide]);

  function nextSlide() {
    console.log(count);
    if (count < items) {
      setStyle({ left: "-" + count * sliderWidth + "px" });
      setCount((prev) => prev + 1);
    } else if (count === items) {
      setStyle({ left: "0px" });
      setCount(1);
    }
  }
  function prevSlide() {
    if (count > 1) {
      setStyle({ left: "-" + (count - 2) * sliderWidth + "px" });
      setCount((prev) => prev - 1);
      //   console.log(1);
    } else if (count === 1) {
      setStyle({ left: "-" + (items - 1) * sliderWidth + "px" });
      setCount(items);
    }
  }

  window.addEventListener("resize", () => {
    setSliderWidth(ref.current ? ref.current.offsetWidth : 0);
  });
  //
  return (
    <AutoSlide id="slider" ref={ref}>
      <ul id="slideWrap" style={style}>
        <SlideImg img={require("../images/canele1.png")} />
        <SlideImg img={require("../images/canele2.png")} />
        <SlideImg img={require("../images/canele3.png")} />
        <SlideImg img={require("../images/canele4.png")} />
      </ul>
      <Arrow
        icon={<KeyboardArrowLeft />}
        style={{ left: 0 }}
        onClick={prevSlide}
      />
      <Arrow
        icon={<KeyboardArrowRight />}
        style={{ right: 0 }}
        onClick={nextSlide}
      />
    </AutoSlide>
  );
};
export default MainPage;
