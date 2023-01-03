import React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;

  .input {
    padding: 0 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DownContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  width: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-left: 3%;
    position: inline-block;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    align-items: center;
    p {
      margin-right: 3%;
    }
  }
`;
const BoxContainer = styled.div`
  margin-top: 10vmin;
  div {
    display: flex;
    justify-content: space-around;
    margin-top: 3vmin;
  }
`;

const Checkout = () => {
  const [send, setSend] = useState(false);
  const [deliver, setDeliver] = useState("");
  const handleDeliver = (event) => {
    setDeliver(event.target.value);
  };
  const [place, setPlace] = useState("");
  const handlePlace = (event) => {
    setPlace(event.target.value);
  };
  const [time, setTime] = useState("");
  const handleTime = (event) => {
    setTime(event.target.value);
  };
  const [pay, setPay] = useState("");
  const handlePay = (event) => {
    setPay(event.target.value);
  };
  if (send === true)
    return (
      <BoxContainer>
        <p>已成功送出訂單～請至會員專區查看訂單詳情</p>
        <div>
          <Button variant="contained">至會員專區</Button>
          <Button variant="contained">返回主頁</Button>
        </div>
      </BoxContainer>
    );
  else
    return (
      <FormContainer>
        <Paper>
          <div className="input">
            <p>訂購人姓名</p>
            <TextField id="standard-basic" label="姓名" variant="standard" />
          </div>
          <div className="input">
            <p>訂購人手機號碼</p>
            <TextField
              id="standard-basic"
              label="手機號碼"
              variant="standard"
            />
          </div>
          <div className="input">
            <p>付款方式</p>
            <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
              <InputLabel id="demo-select-small">付款方式</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={pay}
                label="pay"
                onChange={handlePay}
              >
                <MenuItem value={1}>取貨付款</MenuItem>
                <MenuItem value={2}>銀行轉帳</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input">
            <p>寄送方式</p>
            <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
              <InputLabel id="demo-select-small">寄送方式</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={deliver}
                label="deliver"
                onChange={handleDeliver}
              >
                <MenuItem value={1}>面交</MenuItem>
                <MenuItem value={2}>Lalamove</MenuItem>
                <MenuItem value={3}>冷藏宅配</MenuItem>
              </Select>
            </FormControl>
          </div>
          {deliver === "" ? (
            <></>
          ) : deliver === 1 ? (
            <>
              <div className="input">
                <p>面交地點</p>
                <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
                  <InputLabel id="demo-select-small">面交地點</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={place}
                    label="place"
                    onChange={handlePlace}
                  >
                    <MenuItem value={1}>永安市場捷運站</MenuItem>
                    <MenuItem value={2}>公館捷運站</MenuItem>
                    <MenuItem value={3}>科技大樓捷運站</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <p>面交時間</p>
                <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
                  <InputLabel id="demo-select-small">面交時間</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={time}
                    label="time"
                    onChange={handleTime}
                  >
                    <MenuItem value={1}>星期一晚上六點</MenuItem>
                    <MenuItem value={2}>星期三晚上六點</MenuItem>
                    <MenuItem value={3}>星期六晚上六點</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </>
          ) : (
            <div className="input">
              <p>送貨地址</p>
              <TextField
                id="standard-basic"
                label="送貨地址"
                variant="standard"
              />
            </div>
          )}
        </Paper>
        <DownContainer>
          <FormControlLabel
            control={<Checkbox />}
            label="我同意訂單一旦送出，未經賣家同意不得取消訂單"
          />
          <div>
            <p>總價 NT$ 500</p>
            <Button variant="contained">送出訂單</Button>
          </div>
        </DownContainer>
      </FormContainer>
    );
};

export default Checkout;
