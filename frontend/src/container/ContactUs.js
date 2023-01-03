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
  const [value, setValue] = useState("1");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BoxContainer>
      <Welcome />
      <div className="box">
        <Chip icon={<InstagramIcon />} label="Instagram" variant="outlined" />
        <Chip icon={<EmailIcon />} label="Email" variant="outlined" />
      </div>
    </BoxContainer>
  );
};

export default ContactUs;
