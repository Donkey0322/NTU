import styled from "styled-components";
import React from "react";
import { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const UpperContainer = styled.div`
  display: flex;
  height: 50%;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  img {
    height: 100%;
    width: 100%;
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
          <KeyboardDoubleArrowLeftIcon />
          <SmallImgContainer>
            <img src={require("../images/canele1.png")} alt="" />
            <img src={require("../images/canele2.png")} alt="" />
          </SmallImgContainer>
          <KeyboardDoubleArrowRightIcon />
        </PreviewContainer>
      </ImageContainer>
    </UpperContainer>
  );
};
export default ProductDetail;
