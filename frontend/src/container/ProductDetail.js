import styled from "styled-components";
import React from "react";
import { useWeb } from "./hooks/useWeb";
import { useNavigate } from "react-router-dom";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  AddShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  FormControlLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
// import "./.css";

const PureInput = ({ label, autoComplete, required }) => {
  return (
    <FormControl
      sx={{ width: "min(50%, 50vmin)" }}
      variant="outlined"
      required={Boolean(required)}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        autoComplete={autoComplete && autoComplete}
        label={label}
        type="number"
      />
    </FormControl>
  );
};

const UpperContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vmin;
`;
const Information = styled(Box)`
  display: flex;
  position: relative;
  width: calc(100% - 50vmin);
  flex-direction: column;
  row-gap: 3vmin;
  margin-left: 2vmin;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2vmin;
  width: 50vmin;
  .img {
    width: 50vmin;
    height: 50vmin;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    background-image: url(${({ img }) => img});
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30vmin;
  position: relative;
  /* button {
    background-color: blue;
    text-align: center;
    color: white;
    position: absolute;
  } */
`;
const SmallImgContainer = styled.div`
  width: 8vmin;
  height: 8vmin;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ img }) => img});
`;

const ProductDetail = () => {
    const navigate = useNavigate();
    const { CRUD, login } = useWeb();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      if(!login)
        setOpen(true)
    //   else
    //     submit(data)
    };
    const handleClose = () => {
      setOpen(false);
    };
    const toSignIn = () => {
        navigate("/signin");
      };

  return (
    <UpperContainer>
      <ImageContainer img={require("../images/canele-2-1.png")}>
        <div className="img"></div>
        <PreviewContainer>
          <IconButton>
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <SmallImgContainer img={require("../images/canele-2-1.png")} />
          <SmallImgContainer img={require("../images/canele-3-1.png")} />
          <IconButton>
            <KeyboardDoubleArrowRight />
          </IconButton>
        </PreviewContainer>
      </ImageContainer>
      <Information>
        <Typography variant="h5">抹茶可麗露</Typography>
        <p style={{ color: "darkgray" }}>售價：80$</p>
        <p style={{ width: "min(50%, 50vmin)" }}>
          抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶
        </p>

        <PureInput required={true} label="購買數量" />
        <Button
          variant="contained"
          color="info"
          sx={{
            // width: "min(30%, 30vmin, 120px)",
            position: "absolute",
            right: "1vmin",
          }}
          startIcon={<AddShoppingCart />}
          onClick={handleClickOpen}
        >
          加入購物車
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"想購買商品嗎？"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                請先登入再將商品加入購物車。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={toSignIn} autoFocus>
                登入/註冊
            </Button>
            </DialogActions>
        </Dialog>
      </Information>
    </UpperContainer>
  );
};
export default ProductDetail;
