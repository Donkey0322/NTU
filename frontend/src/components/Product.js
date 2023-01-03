import styled from "styled-components";

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
  width: 30vmin;
  height: 30vmin;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
`;

const item = [
  { src: require("../images/canele-1-1.png"), label: "抹茶可麗露", price: 80 },
  {
    src: require("../images/canele-2-1.png"),
    label: "巧克力可麗露",
    price: 80,
  },
  { src: require("../images/canele-3-1.png"), label: "香草可麗露", price: 80 },
];

const Product = ({ style, data }) => {
  return (
    <ProductsContainer style={style && style}>
      {item.map((i, index) => (
        <div className="product" key={index}>
          <ProductImgContainer>
            <img src={i.src} alt="" />
          </ProductImgContainer>
          <p className="label">{i.label}</p>
          <p className="price">${i.price}</p>
        </div>
      ))}
    </ProductsContainer>
  );
};

export default Product;
