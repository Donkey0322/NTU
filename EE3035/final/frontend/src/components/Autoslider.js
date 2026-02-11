import styled from "styled-components";
import { forwardRef } from "react";
import { Button, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
const SlideWidth = "120vmin";

const AutoSlide = styled.div`
  position: relative;
  width: ${SlideWidth};
  overflow: hidden;
  box-shadow: 0 0 30px black;
  margin-top: 5vmin;
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
const Autoslider = forwardRef(({ style, prevSlide, nextSlide }, ref) => (
  <AutoSlide id="slider" ref={ref}>
    <ul id="slideWrap" style={style}>
      <SlideImg img={require("../images/main-1.png")} />
      <SlideImg img={require("../images/main-2.png")} />
      <SlideImg img={require("../images/main-3.png")} />
      <SlideImg img={require("../images/main-4.png")} />
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
));

export default Autoslider;
