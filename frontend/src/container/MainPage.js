import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Autoslider from "../components/Autoslider";
import { useWeb } from "./hooks/useWeb";

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2vmin 2%;
  div.product {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: grab;
    .price {
      color: darkgray;
    }
    .label {
      font-size: large;
      max-width: 25vmin;
      text-align: center;
      /* font-size: ; */
      font-weight: 500;
    }
    &:hover {
      > div {
        background-color: white;
        transition: all 0.3s ease;
        opacity: 0.7;
      }
      img {
        transform: scale(1.25);
      }

      .price {
        transition: all 0.3s ease;
        color: black;
      }
    }
  }
  ${({ style }) => ({ ...style })}
`;
const ProductImgContainer = styled.div`
  overflow: hidden;
  width: 28vmin;
  height: 28vmin;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
`;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

const MainPage = () => {
  const [style, setStyle] = useState({});
  const [sliderWidth, setSliderWidth] = useState(0);
  const [count, setCount] = useState(1);
  const [items, setItems] = useState(4);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const { CRUD } = useWeb();

  useEffect(() => {
    const Render = async () => {
      try {
        const result = await CRUD(
          "R",
          "/products"
        )({ section: "all", method: null });
        setProducts(result);
      } catch (err) {
        console.log("有問題");
      }
    };
    Render();
  }, []);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "2vmin",
        width: "120vmin",
      }}
    >
      <Autoslider
        style={style}
        ref={ref}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
      <ProductsContainer style={style && style}>
        {products &&
          shuffleArray(products).map(
            (i, index) =>
              index < 4 && (
                <div
                  className="product"
                  key={index}
                  onClick={() => navigate(`/products/${i.product_id}`)}
                >
                  <ProductImgContainer>
                    <img src={require("../" + i.img[0] + ".png")} alt="" />
                  </ProductImgContainer>
                </div>
              )
          )}
      </ProductsContainer>
    </div>
  );
};
export default MainPage;
