import React, { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styled from "styled-components";
import Product from "../components/Product";

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
  const [sort, setSort] = useState("");
  const { id } = useParams();
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <ProductContainer>
      <LeftContainer>
        <List
          sx={{
            width: "180px",
            // maxWidth: "150px",
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-label="secondary mailbox folders"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <img className="icon" src={require("../icons/top.png")} alt="" />
              <ListItemText primary="熱門商品" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <img
                className="icon"
                src={require("../icons/canele.png")}
                alt=""
              />
              <ListItemText primary="可麗露" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <img
                className="icon"
                src={require("../icons/basque.png")}
                alt=""
              />
              <ListItemText primary="巴斯克乳酪蛋糕" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <img
                className="icon"
                src={require("../icons/cookie.png")}
                alt=""
              />
              <ListItemText primary="餅乾" />
            </ListItemButton>
          </ListItem>
        </List>
      </LeftContainer>
      <RightContainer>
        {id ? (
          <Outlet />
        ) : (
          <>
            <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
              <InputLabel id="demo-select-small">排序</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={sort}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>價格由低到高</MenuItem>
                <MenuItem value={20}>價格由高到低</MenuItem>
                <MenuItem value={30}>銷量由高到低</MenuItem>
              </Select>
            </FormControl>
            <Product />
          </>
        )}
      </RightContainer>
    </ProductContainer>
  );
};
export default Products;
