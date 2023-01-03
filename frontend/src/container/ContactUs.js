import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const Welcome = styled.div`
  width: 52vmin;
  height: 40vmin;
  margin-right: 3vmin;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${require("../images/contact-us.png")});
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: Center;
  width: 100%;
  margin-top: 10vmin;
  div.box {
    display: flex;
    justify-content: Center;
    flex-direction: column;
  }
`;

const ContactUs = () => {

  return (
    <BoxContainer>
      <Welcome />
      <div className="box">
        <Chip icon={<InstagramIcon />} label="Instagram" variant="outlined" />
        <a href="https://instagram.com/gros_patisserie?igshid=YmMyMTA2M2Y=">gros_patisserie</a>
        <Chip icon={<EmailIcon />} label="Email" variant="outlined" />
        <p>grospatisserie@gmail.com</p>
      </div>
    </BoxContainer>
  );
};

export default ContactUs;
