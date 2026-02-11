import React, { useState } from "react";
import { useWeb } from "./hooks/useWeb";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductIndividual } from "../components/Products";

const ProductDetail = () => {
  const [item_detail] = useOutletContext();
  const [item, setItem] = useState(item_detail);
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();
  const { CRUD, login, cookies, setCartNumber } = useWeb();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    if (!login) setOpen(true);
    else {
      try {
        if (quantity === 0) return;
        else {
          setCartNumber((prev) => prev + 1);
          await CRUD(
            "C",
            "/basket"
          )({
            customer_id: cookies.customer_id,
            product_id: item.product_id,
            quantity: Number(quantity),
          });
          setQuantity(0);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toSignIn = () => {
    navigate("/signin");
  };

  const handleQuantityChange = (event) => {
    // console.log(event.target.value);
    const { value } = event.target;
    if (value < 0) return;
    setQuantity(value);
  };

  function nextImg() {
    const newImg = [];
    for (const i in item.img) {
      if (Number(i) !== 0) {
        console.log(typeof i);
        newImg.push(item.img[i]);
      }
    }
    newImg.push(item.img[0]);
    setItem((prev) => ({ ...prev, img: newImg }));
  }

  function prevImg() {
    const newImg = [];
    newImg.push(item.img[item.img.length - 1]);
    for (const i in item.img) {
      if (Number(i) !== item.img.length - 1) newImg.push(item.img[i]);
    }
    setItem((prev) => ({ ...prev, img: newImg }));
  }

  return (
    <ProductIndividual
      item={item}
      open={open}
      quantity={quantity}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      toSignIn={toSignIn}
      nextImg={nextImg}
      prevImg={prevImg}
      handleQuantityChange={handleQuantityChange}
    />
  );
};
export default ProductDetail;
