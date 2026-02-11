import {
  InputLabel,
  FormControl,
  OutlinedInput,
  Input,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styled from "styled-components";

const PureInput = ({
  label,
  autoComplete,
  onChange,
  name,
  error,
  variant,
  inputType,
  value,
}) => {
  return (
    <FormControl
      sx={{ minWidth: "min(30%, 30vmin)" }}
      disabled={name === "mail"}
    >
      {inputType !== "date" && <InputLabel htmlFor={label}>{label}</InputLabel>}
      {inputType === "outlined" ? (
        <OutlinedInput
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          value={value}
          onChange={onChange}
          sx={{ width: "35ch" }}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : inputType === "standard" ? (
        <Input
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          sx={{ width: "35ch" }}
          value={value}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(props) => <TextField {...props} name="date" />}
            value={value ? value : ""}
            label={label}
            name={name}
            onChange={(e) => onChange({ target: { name, value: e } })}
          />
        </LocalizationProvider>
      )}
    </FormControl>
  );
};
const Container = styled.div`
  margin-top: 5vmin;
  margin-left: 35%;
`;

const VipInfoBox = ({
  title,
  label,
  name,
  inputType,
  handleInputChange,
  select,
  variant,
  value,
}) => {
  return (
    <Container>
      <p
        style={{
          width: "min(15%, 15vmin)",
          height: "min(10%, 10vmin)",
          padding: "0.5% 0%",
          fontSize: "2vmin",
          backgroundColor: "LavenderBlush",
          borderRadius: "20px",
          color: "IndianRed",
          textAlign: "center",
        }}
      >
        {title}
      </p>
      <PureInput
        required={true}
        label={label}
        //   autoComplete="username"
        onChange={handleInputChange}
        name={name}
        inputType={inputType}
        variant={variant}
        select={select && select}
        value={value}
      />
    </Container>
  );
};

export default VipInfoBox;
