import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { useWeb } from "./hooks/useWeb";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@mui/material";

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

const Forget = () => {
  const { CRUD } = useWeb();
  const [data, setData] = useState({});
  const Query = CRUD("C", "/password/forgot-password");
  const [press, setPress] = useState(false);
  const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true)
    };
    const handleClose = () => {
      setOpen(false);
    };
  const handleInputChange = (event) => {
    const { value } = event.target;
    setData({ email: value });
  };

  return (
    <WholeContainer>
      <div className="info">
        <div className="title">
          <h1>忘記密碼</h1>
        </div>
        <div className="input">
          <p>輸入會員帳號（信箱）</p>
          <TextField
            className="text"
            label=""
            variant="standard"
            defaultValue=""
            onChange={handleInputChange}
          />
        </div>
        <div className="edit">
          <Button
            disabled={press}
            variant="contained"
            onClick={() => {
              setPress(true);
              setOpen(true);
              Query(data);
            }}
          >
            傳送驗證碼
          </Button> 
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"已寄出電子郵件"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                請點擊郵件中的連結以重設密碼。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                確認
            </Button>
            </DialogActions>
        </Dialog>
        </div>
      </div>
    </WholeContainer>
  );
};

export default Forget;
