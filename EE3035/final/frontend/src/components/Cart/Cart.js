import styled from "styled-components";
import { Paper, Button } from "@mui/material";
import CartDetail from "./CartDetail";

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2vmin;
`;
const DownContainer = styled.div`
  width: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 3vmin;
`;

const Cart = ({
  items,
  sum,
  handleCartDetailCheck,
  handleCartDetailNum,
  handleDeleteCart,
  handleCartSubmit,
}) => {
  return (
    <WholeContainer>
      <Paper>
        {items &&
          items.map((i, index) => (
            <CartDetail
              basket_id={i.basket_id}
              product_name={i.product_name}
              src={i.img}
              price={i.price}
              quantity={i.quantity}
              key={index}
              handleCartDetailCheck={handleCartDetailCheck}
              handleCartDetailNum={handleCartDetailNum}
              handleDeleteCart={handleDeleteCart}
            />
          ))}
      </Paper>
      <DownContainer>
        <p>總價 NT$ {sum}</p>
        <Button variant="contained" onClick={handleCartSubmit}>
          前往結帳
        </Button>
      </DownContainer>
    </WholeContainer>
  );
};
export default Cart;
