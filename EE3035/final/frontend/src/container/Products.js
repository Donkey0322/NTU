import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductsWithSortBar, Filter } from "../components/Products/index.js";
import { useWeb } from "./hooks/useWeb";

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
`;
const LeftContainer = styled.div`
  /* border-top: 2px solid black; */
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
  margin-bottom: 5vmin;
`;

const Products = () => {
  const [data, setData] = useState({ section: "all", method: null });
  const [products, setProducts] = useState(null);
  const [sort, setSort] = useState("");
  const { id } = useParams();
  //Outlet
  let item_detail = {};
  if (id && products) item_detail = products.find((p) => p.product_id == id);
  const navigate = useNavigate();

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setData((prev) => ({
      ...prev,
      method: event.target.value,
    }));
  };

  const handleSectionSubmit = async (section) => {
    navigate("/products");
    try {
      const result = await CRUD("R", "/products")({ ...data, section });
      setData({ ...data, section });
      setProducts(result);
    } catch (err) {
      console.log("有問題");
    }
  };

  const { CRUD } = useWeb();

  const handleNavigateToDetail = (product_id) => {
    navigate("/products/" + product_id);
  };

  useEffect(() => {
    const Render = async () => {
      try {
        console.log("data", data);
        const result = await CRUD("R", "/products")(data);
        setProducts(result);
      } catch (err) {
        alert("有問題");
      }
    };
    Render();
  }, [sort]);

  return (
    <ProductContainer>
      <LeftContainer>
        <Filter
          data={data}
          submit={handleSectionSubmit}
          setProducts={setProducts}
        />
      </LeftContainer>
      <RightContainer>
        {id && products ? (
          <Outlet context={[item_detail]} />
        ) : (
          <ProductsWithSortBar
            sort={sort}
            handleSortChange={handleSortChange}
            handleNavigateToDetail={handleNavigateToDetail}
            products={products}
          />
        )}
      </RightContainer>
    </ProductContainer>
  );
};
export default Products;
