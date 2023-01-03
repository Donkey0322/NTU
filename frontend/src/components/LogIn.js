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
import { useNavigate, Outlet } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
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
  justify-content: center;
  width: 100%;
  margin-top: 10vmin;
  .button {
    display: flex;
  }
`;

const CustomedTabPanel = styled(TabPanel)`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const PureInput = ({
  label,
  autoComplete,
  required,
  onChange,
  show,
  showclick,
  name,
}) => {
  return (
    <FormControl
      sx={{ width: "min(100%, 50vmin)" }}
      variant="outlined"
      required={Boolean(required)}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        name={name}
        autoComplete={autoComplete && autoComplete}
        label={label}
        onChange={onChange}
        type={label.includes("密碼") ? (show ? "text" : "password") : "text"}
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

const LogIn = ({
  data,
  mode,
  showPassword,
  handleClickShowPassword,
  handleModeChange,
  handleInputChange,
  submit,
}) => {
  const navigate = useNavigate();
  return (
    <BoxContainer>
      <Welcome />
      <Box sx={{ width: "calc(100% - 57vmin)", typography: "body1" }}>
        <TabContext value={mode}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleModeChange} centered>
              <Tab label="會員登入" value="1" />
              <Tab label="註冊會員" value="2" />
            </TabList>
          </Box>
          <CustomedTabPanel value="1" sx={{ display: mode !== "1" && "none" }}>
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
                onChange={handleInputChange}
                name="mail"
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
                onChange={handleInputChange}
                name="password"
              />
              <div className="button">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "min(10%, 10vmin)" }}
                  onClick={() => submit(data)}
                >
                  登入
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "min(45%, 20vmin)" }}
                  onClick={() => navigate("/forget")}
                >
                  忘記密碼？
                </Button>
              </div>
              
            </Box>
          </CustomedTabPanel>
          <CustomedTabPanel value="2">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "2vmin",
              }}
            >
              <PureInput
                required={true}
                label="輸入帳號"
                autoComplete="username"
                onChange={handleInputChange}
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
                onChange={handleInputChange}
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
                onClick={() => submit(data)}
              >
                註冊
              </Button>
            </Box>
          </CustomedTabPanel>
        </TabContext>
      </Box>
    </BoxContainer>
  );
};

export default LogIn;
