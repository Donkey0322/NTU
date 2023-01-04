import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  IconButton,
  Checkbox,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
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
  basket_id,
  product_name,
  src,
  price,
  quantity,
  number,
  handleCartDetailCheck,
  handleCartDetailNum,
  handleDeleteCart,
}) => {
  const summaryArr = npArange(quantity);
  return (
    <ItemContainer>
      <LeftContainer>
        <Checkbox
          {...label}
          onChange={(e) => handleCartDetailCheck(basket_id)(e)}
        />
        <img src={src} alt="" />
        <p>{product_name}</p>
      </LeftContainer>
      <RightContainer>
        <p>NT${price}</p>
        {summaryArr.length > 0 && (
          <FormControl sx={{ minWidth: 70 }} size="small">
            <InputLabel id="demo-select-small">數量</InputLabel>
            <Select
              labelId="demo-select-small"
              value={number}
              label="數量"
              onChange={(e) => {
                handleCartDetailNum(basket_id)(e);
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
        <IconButton aria-label="delete" onClick={handleDeleteCart}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </RightContainer>
    </ItemContainer>
  );
};
export default CartDetail;
