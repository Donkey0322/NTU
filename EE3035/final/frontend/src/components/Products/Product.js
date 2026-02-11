import styled from "styled-components";

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-right: 5vmin;
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
  width: 25vmin;
  height: 25vmin;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
`;

const Product = ({ style, products, handleNavigateToDetail }) => {
  return (
    <ProductsContainer style={style && style}>
      {products &&
        products.map((i, index) => (
          <div
            className="product"
            key={index}
            onClick={() => handleNavigateToDetail(i.product_id)}
          >
            <ProductImgContainer>
              <img src={require("../../" + i.img[0] + ".png")} alt="" />
            </ProductImgContainer>
            <p className="label">{i.product_name}</p>
            <p className="price">${i.price}</p>
          </div>
        ))}
    </ProductsContainer>
  );
};

export default Product;
