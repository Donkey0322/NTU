import styled from "styled-components";
import React from "react";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
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
} from "@mui/material";
// import "./.css";

const PureInput = ({ label, autoComplete, required }) => {
  return (
    <FormControl
      sx={{ width: "min(100%, 50vmin)" }}
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
  /* min-height: 50vh; */
`;
const Information = styled(Box)`
  display: flex;
  position: relative;
  width: 60%;
  flex-direction: column;
  row-gap: 1vmin;
  margin-left: 2vmin;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  img {
    height: 100%;
    /* width: 100%; */
  }
`;
const PreviewContainer = styled.div`
  display: flex;
`;
const SmallImgContainer = styled.div`
  width: 100;
  display: flex;
  img {
    height: 30%;
    width: 30%;
  }
`;

const ProductDetail = () => {
  return (
    <UpperContainer>
      <ImageContainer>
        <img src={require("../images/canele1.png")} alt="" />
        <PreviewContainer>
          <KeyboardDoubleArrowLeft />
          <SmallImgContainer>
            <img src={require("../images/canele1.png")} alt="" />
            <img src={require("../images/canele2.png")} alt="" />
          </SmallImgContainer>
          <KeyboardDoubleArrowRight />
        </PreviewContainer>
      </ImageContainer>
      <Information>
        <Typography variant="h5">抹茶可麗露</Typography>
        <p>售價：80$</p>
        <p>
          抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶抹茶
        </p>
        <div style={{ bottom: "0", position: "absolute" }}>
          <PureInput required={true} label="購買數量" />
        </div>
      </Information>
    </UpperContainer>
  );
};
export default ProductDetail;
