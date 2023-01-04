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
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import styled from "styled-components";
import "./style.css";

function HelperText({ color, children }) {
  return (
    <Typography color={color} variant="caption">
      {children}
    </Typography>
  );
}

HelperText.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

HelperText.defaultProps = {
  color: "default",
};

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
  margin-top: 5vmin;
  .button {
    margin-top: 2vmin;
    width: min(100%, 50vmin);
    display: flex;
    justify-content: space-around;
  }
`;

const CustomedTabPanel = styled(TabPanel)`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const GoogleLogin = styled.button`
  background: #fff;
  font-size: min(3vmin, 20px);
  border-radius: 25vmin;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-left: 2vmin; */
  width: max(30%, 30vmin);
  min-width: 250px;
  height: min(10vmin, 60px);
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: all 0.2s;

  &:active,
  &:focus,
  &:hover {
    border-color: #6a679e;
    outline: none;
  }
`;

const PureInput = ({
  label,
  autoComplete,
  required,
  onChange,
  show,
  showclick,
  name,
  error,
}) => {
  return (
    <FormControl
      sx={{ width: "min(100%, 50vmin)" }}
      variant="outlined"
      required={Boolean(required)}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        name={name}
        autoComplete={autoComplete && autoComplete}
        label={label}
        onChange={onChange}
        color={error && error[name] ? "error" : "primary"}
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
      {error && error[name] && (
        <HelperText color="error">{error[name]}</HelperText>
      )}
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
  handleGoogleClick,
  submit,
  error,
  navigateToForgetPassword,
  handleChange,
  checked,
  handleInputChange1,
  handleInputChange2,
  pass1,
  pass2
}) => {
  return (
    <BoxContainer>
      <Welcome />
      <Box
        sx={{
          width: "calc(100% - 57vmin)",
          typography: "body1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TabContext value={mode}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
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
                rowGap: "2vmin",
              }}
            >
              <PureInput
                required={true}
                label="輸入帳號"
                autoComplete="username"
                onChange={handleInputChange}
                name="mail"
                error={error}
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
                onChange={handleInputChange}
                name="password"
                error={error}
              />
              <div className="button">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "min(10%, 10vmin)" }}
                  onClick={submit}
                >
                  登入
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ width: "min(45%, 20vmin)" }}
                  onClick={navigateToForgetPassword}
                >
                  忘記密碼？
                </Button>
              </div>
            </Box>
          </CustomedTabPanel>
          <CustomedTabPanel value="2" sx={{ display: mode !== "2" && "none" }}>
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
                error={error}
                name="mail"
              />
              <Password
                label="輸入密碼"
                required={true}
                autoComplete="current-password"
                show={showPassword}
                showclick={handleClickShowPassword}
                onChange={handleInputChange1}
                error={error}
                name="password"
              />
              <Password
                color={!(pass1 === pass2) ? "error" : "primary"} // pass1 pass2 是兩次的密碼
                label="確認密碼"
                required={true}
                autoComplete="current-password"
                onChange={handleInputChange2}
                show={showPassword}
                showclick={handleClickShowPassword}
                helperText={!(pass1 === pass2) ? "請輸入相同密碼" : ""}
              />
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange}/>}
                label="我同意網站服務條款及隱私權政策"
              />
              <Button
                variant="contained"
                disabled={!checked}
                color="info"
                sx={{ width: "min(10%, 10vmin)" }}
                onClick={submit}
              >
                註冊
              </Button>
            </Box>
          </CustomedTabPanel>
          <GoogleLogin onClick={handleGoogleClick}>
            <img
              src="https://img.icons8.com/color/48/null/google-logo.png"
              style={{
                marginRight: "1vmin",
                height: "8vmin",
                maxHeight: "35px",
              }}
            />
            <p>Login with Google</p>
          </GoogleLogin>
        </TabContext>
      </Box>
    </BoxContainer>
  );
};

export default LogIn;
