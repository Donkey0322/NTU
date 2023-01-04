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

const PureInput = ({ label, autoComplete, required, onChange }) => {
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
          {
            item.img.map(
              (i, index) =>
                 (
                  <SmallImgContainer
                    img={require("../../" + i + ".png")}
                    key={index}
                  />
                )
            )}

          {/* <SmallImgContainer img={require("../../images/canele-3-1.png")} /> */}
          <IconButton onClick={nextImg}>
            <KeyboardDoubleArrowRight />
          </IconButton>
        </PreviewContainer>
      </ImageContainer>
      <Information>
        <Typography variant="h5">{item.product_name}</Typography>
        <p style={{ color: "darkgray" }}>售價：{item.price}$</p>
        <p style={{ width: "min(50%, 50vmin)" }}>{item.description}</p>

        <PureInput
          required={true}
          label="購買數量"
          onChange={handleQuantityChange}
        />
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
