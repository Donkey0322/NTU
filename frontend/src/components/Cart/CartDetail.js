import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import React from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 15vmin;
  width: 80vw;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  column-gap: 2vmin;
  img {
    height: 80%;
  }
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3vmin;
  justify-content: flex-end;
`;

const npArange = (num) => {
  const result = [];
  for (let i = 0; i < num + 1; i++) {
    result.push(i);
  }
  return result;
};

const CartDetail = ({
  cart_id,
  name,
  src,
  price,
  summary,
  quantity,
  handleCartDetailCheck,
  handleCartDetailNum,
}) => {
  const [num, setNum] = useState(quantity);
  const handleChange = (event) => {
    setNum(event.target.value);
  };
  const summaryArr = npArange(summary);
  return (
    <ItemContainer>
      <LeftContainer>
        <Checkbox
          {...label}
          onChange={(e) => handleCartDetailCheck(cart_id)(e)}
        />
        <img src={src} alt="" />
        <p>{name}</p>
      </LeftContainer>
      <RightContainer>
        <p>NT${price}</p>
        {summaryArr.length > 0 && (
          <FormControl sx={{ minWidth: 70 }} size="small">
            <InputLabel id="demo-select-small">數量</InputLabel>
            <Select
              labelId="demo-select-small"
              value={num}
              label="數量"
              onChange={(e) => {
                handleChange(e);
                handleCartDetailNum(cart_id)(e);
              }}
            >
              {summaryArr.map((m, index) => (
                <MenuItem value={m} key={index}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <IconButton aria-label="delete">
          <HighlightOffOutlinedIcon />
        </IconButton>
      </RightContainer>
    </ItemContainer>
  );
};
export default CartDetail;
