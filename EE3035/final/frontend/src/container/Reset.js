import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import { useSearchParams , useNavigate} from "react-router-dom";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useWeb } from "./hooks/useWeb";

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
    padding-left: 15vmin;
  }
`;

const Reset = () => {
  const navigate = useNavigate();
  const { CRUD } = useWeb();
  const [data, setData] = useState({});
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [same, setSame] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const customer_id = searchParams.get("customer_id")
  const token = searchParams.get("token")
  const Query = CRUD("C", `/password/reset-password/${customer_id}/${token}`);
  const handleInputChange1 = (event) => {
    const { value } = event.target;
    setData({ password: value });
    setPass1(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setPass2(event.target.value);
  };
  const resetPassword = () => {
    if(pass1 === pass2) {
        Query(data);
        navigate("/signin") 
    }
    else {
        console.log(pass1, pass2);
        setSame(false);
    }
  }
  return (
    <WholeContainer>
      <div className="info">
        <div className="title">
          <h1>重設密碼</h1>
        </div>
        <div className="input">
          <p>輸入新密碼</p>
          <TextField
            className="text"
            label=""
            variant="standard"
            defaultValue=""
            type="password"
            onChange={handleInputChange1}
          />
        </div>
        <div className="input">
          <p>請再次輸入新密碼</p>
          <TextField
            color={!same ? "error" : "primary"}
            className="text"
            variant="standard"
            defaultValue=""
            type="password"
            onChange={handleInputChange2}
            helperText={!same ? "兩次輸入密碼不同，請再次輸入" : ""}
          />
        </div>
        <div className="edit">
          <Button
            variant="contained"
            onClick={resetPassword}
          >
            確定送出
          </Button>
        </div>
      </div>
    </WholeContainer>
  );
};

export default Reset;
