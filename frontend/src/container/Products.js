import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ProductsWithSortBar, Filter } from "../components/Products/index.js";
import { useWeb } from "./hooks/useWeb";

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
`;
const LeftContainer = styled.div`
  border-top: 2px solid black;
  .icon {
    width: 20px;
    margin-right: 10px;
    padding-bottom: 5px;
  }
`;
const RightContainer = styled.div`
  width: calc(100% - 180px);
  margin-top: 2vmin;
  margin-left: min(2vmin, 10px);
`;

const Products = () => {
  const [data, setData] = useState({ section: "all", method: null });
  const [products, setProducts] = useState(null);
  const [sort, setSort] = useState("");
  const { id } = useParams();
  const handleSortChange = (event) => {
    setSort(event.target.value);
    setData((prev) => ({
      ...prev,
      method: event.target.value,
    }));
  };
  const { CRUD } = useWeb();
  const Query = CRUD("R", "/products");

  // useEffect(() => {
  //   const result = Query(data);
  //   setProducts(result);
  // }, []);

  return (
    <ProductContainer>
      <LeftContainer>
        <Filter data={data} submit={Query} setProducts={setProducts} />
      </LeftContainer>
      <RightContainer>
        {id ? (
          <Outlet />
        ) : (
          <ProductsWithSortBar
            sort={sort}
            handleSortChange={handleSortChange}
            products={products}
          />
        )}
      </RightContainer>
    </ProductContainer>
  );
};
export default Products;
