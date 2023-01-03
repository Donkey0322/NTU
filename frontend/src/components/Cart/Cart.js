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

const Cart = ({ items, sum, handleCartDetailCheck, handleCartDetailNum }) => {
  return (
    <WholeContainer>
      <Paper>
        {items &&
          items.map((i, index) => (
            <CartDetail
              cart_id={i.cart_id}
              name={i.name}
              src={i.src}
              price={i.price}
              summary={i.summary}
              quantity={i.quantity}
              key={index}
              handleCartDetailCheck={handleCartDetailCheck}
              handleCartDetailNum={handleCartDetailNum}
            />
          ))}
      </Paper>
      <DownContainer>
        <p>總價 NT$ {sum}</p>
        <Button variant="contained">前往結帳</Button>
      </DownContainer>
    </WholeContainer>
  );
};
export default Cart;
