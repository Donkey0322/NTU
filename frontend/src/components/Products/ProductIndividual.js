import styled from "styled-components";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  AddShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  InputLabel,
  IconButton,
  OutlinedInput,
  FormControl,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const PureInput = ({ label, autoComplete, required, onChange, value }) => {
  return (
    <FormControl
      sx={{ width: "min(30%, 30vmin)" }}
      variant="outlined"
      required={Boolean(required)}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        autoComplete={autoComplete && autoComplete}
        label={label}
        type="number"
        value={value}
        onChange={onChange}
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
  padding: 2%;
  width: calc(100% - 50vmin);
  flex-direction: column;
  margin-top: 5%;
  row-gap: 5vmin;
  margin-left: 10vmin;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2vmin;
  width: 50vmin;
  padding: 2%;
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
`;

const SmallImgContainer = styled.div`
  width: 8vmin;
  height: 8vmin;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ img }) => img});
`;

const ProductIndividual = ({
  item,
  quantity,
  open,
  handleClickOpen,
  handleClose,
  toSignIn,
  nextImg,
  prevImg,
  handleQuantityChange,
}) => {
  return (
    <UpperContainer>
      <ImageContainer img={require("../../" + item.img[0] + ".png")}>
        <div className="img"></div>
        <PreviewContainer>
          <IconButton onClick={prevImg}>
            <KeyboardDoubleArrowLeft />
          </IconButton>
          {item.img.map((i, index) => (
            <SmallImgContainer
              img={require("../../" + i + ".png")}
              key={index}
            />
          ))}

          {/* <SmallImgContainer img={require("../../images/canele-3-1.png")} /> */}
          <IconButton onClick={nextImg}>
            <KeyboardDoubleArrowRight />
          </IconButton>
        </PreviewContainer>
      </ImageContainer>
      <Information>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {item.product_name}
        </Typography>
        <p style={{ color: "RosyBrown", fontSize: "2vmin" }}>
          售價：{item.price}$
        </p>
        <p
          style={{
            width: "min(70%, 70vmin)",
            fontSize: "2vmin",
            backgroundColor: "LavenderBlush",
            padding: "3%",
            borderRadius: "20px",
            color: "IndianRed",
          }}
        >
          {item.description}
        </p>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2vmin" }}
        >
          <PureInput
            required={true}
            label="購買數量"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <Button
            variant="contained"
            color="info"
            startIcon={<AddShoppingCart />}
            onClick={handleClickOpen}
          >
            加入購物車
          </Button>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"想購買商品嗎？"}</DialogTitle>
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
export default ProductIndividual;
