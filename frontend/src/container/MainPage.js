import React, { useEffect, useState, useRef } from "react";
import Autoslider from "../components/Autoslider";

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
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  function nextSlide() {
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

  return (
    <Autoslider
      style={style}
      ref={ref}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
    />
  );
};
export default MainPage;
