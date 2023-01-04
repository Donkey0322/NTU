import {Chip, IconButton} from "@mui/material/";
import React, { useState } from "react";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

// const Welcome = styled.div`
//   width: 52vmin;
//   height: 40vmin;
//   margin-right: 3vmin;
//   background-size: cover;
//   background-position-x: center;
//   background-position-y: center;
//   background-image: url(${require("../images/contact-us.png")});
// `;

const BoxContainer = styled.div`
  display: flex;
  justify-content: Center;
  width: 100%;
  margin-top: 30vmin;

  div.box {
    display: flex;
    justify-content: Center;
    gap: 15%;
    text-align: center;
    font-size: 3vmin;
    font-weight: 900;
  }
  flex-direction: column;
`;



const ContactUs = () => {

  return (
    <BoxContainer>
      <div className="box">
        <div>
          <IconButton href="https://instagram.com/gros_patisserie?igshid=YmMyMTA2M2Y=" color = "secondary">
          <InstagramIcon sx={{fontSize: 150}}/>
          </IconButton>
          <p styled ={{fontSize :20}}>grospatisserie</p>
        </div>
        <div>
        <IconButton color = "secondary" disabled>
          <EmailIcon sx={{fontSize: 150}}/>
        </IconButton>

          <p>grospatisserie@gmail.com</p>
        </div>
      </div>
      {/* <Welcome /> */}
    </BoxContainer>
  );
};

export default ContactUs;