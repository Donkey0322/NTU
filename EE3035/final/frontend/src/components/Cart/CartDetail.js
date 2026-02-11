import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  IconButton,
  Checkbox,
  InputLabel,
  FormControl,
  OutlinedInput,
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
  column-gap: 5vmin;
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

const CartDetail = ({
  basket_id,
  product_name,
  src,
  price,
  quantity,
  handleCartDetailCheck,
  handleCartDetailNum,
  handleDeleteCart,
}) => {
  return (
    <ItemContainer>
      <LeftContainer>
        <Checkbox
          {...label}
          onChange={(e) => handleCartDetailCheck(basket_id)(e)}
        />
        <img src={src && require("../../" + src + ".png")} alt="" />
        <p>{product_name}</p>
      </LeftContainer>
      <RightContainer>
        <p>NT${price}</p>

        <FormControl sx={{ maxWidth: "50vmin" }} size="small">
          <InputLabel id="demo-select-small">數量</InputLabel>
          <OutlinedInput
            // labelId="demo-select-small"
            label="數量"
            type="number"
            onChange={(e) => {
              handleCartDetailNum(basket_id)(e);
            }}
            value={quantity}
          />
        </FormControl>

        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteCart(basket_id)}
        >
          <HighlightOffOutlinedIcon />
        </IconButton>
      </RightContainer>
    </ItemContainer>
  );
};
export default CartDetail;
