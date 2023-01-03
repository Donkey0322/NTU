import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const WholeContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 5vmin;
    align-items: center;
    justify-content: center;
    .info {
        margin-top: 10vmin;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }
    .input {
        padding-left: 5vmin;
    }
    h1 {
        border-bottom: 8px solid gray;
        font-size: 24px;
        display: inline-block;
    }
    .title {
        margin-bottom: 20px;
    }
    .text {
        margin-top: 1vmin;
    }
    .edit {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 3vmin;
    }
`;

const Reset = () => {

  return (
    <WholeContainer>
        <div className="info">
            <div className="title">
                <h1>重設密碼</h1>
            </div>  
            <div className="input">
                <p>輸入新密碼</p>
                <TextField className='text' label="" variant="standard" defaultValue="" type="password" />
            </div> 
            <div className="input">
                <p>請再次輸入新密碼</p>
                <TextField  className="text" variant="standard" defaultValue="" type="password" />
            </div> 
            <div className="edit">
                <Button>確定送出</Button>
            </div> 
        </div>  
    </WholeContainer>
    
  );
};

export default Reset;
