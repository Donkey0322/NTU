import {
  Box,
  Tab,
  Button,
  Checkbox,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import styled from "styled-components";
import "./.css";

const Welcome = styled.div`
  width: 52vmin;
  height: 40vmin;
  margin-right: 3vmin;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${require("../images/welcome.png")});
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: Center;
  width: 100%;
  margin-top: 10vmin;
`;
const PureInput = ({ label, autoComplete, required, show, showclick }) => {
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
        type={label.includes("密碼") && show ? "text" : "password"}
        endAdornment={
          label.includes("密碼") && (
            <InputAdornment position="end">
              <IconButton onClick={showclick}>
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

const Password = styled(PureInput)`
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
`;

const LogIn = () => {
  const [value, setValue] = useState("1");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BoxContainer>
      <Welcome />
      <Box sx={{ width: "calc(100% - 57vmin)", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab label="會員登入" value="1" />
              <Tab label="註冊會員" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <PureInput
                required={true}
                label="輸入帳號"
                autoComplete="username"
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ width: "min(10%, 10vmin)" }}
              >
                登入
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <PureInput
                required={true}
                label="輸入帳號"
                autoComplete="username"
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
              />
              <Password
                label="確認密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="我同意網站服務條款及隱私權政策"
              />
              <Button
                variant="contained"
                color="info"
                sx={{ width: "min(10%, 10vmin)" }}
              >
                註冊
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </BoxContainer>
  );
};

export default LogIn;
