import {
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Select,
  Input,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styled from "styled-components";

const PureInput = ({
  label,
  autoComplete,
  required,
  onChange,
  name,
  error,
  variant,
  inputType,
  select,
  value,
}) => {
  return (
    <FormControl
      sx={{ width: "min(30%, 30vmin)" }}
      variant={variant && variant !== "date" && variant}
      // required={Boolean(required)}
    >
      {inputType !== "date" && <InputLabel htmlFor={label}>{label}</InputLabel>}
      {inputType === "outlined" ? (
        <OutlinedInput
          required
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : inputType === "standard" ? (
        <Input
          required
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : inputType === "select" ? (
        <Select
          labelId={label}
          value={value ? value : ""}
          label={label}
          onChange={onChange}
          name={name}
        >
          {select.map((m, index) => (
            <MenuItem value={m} key={index}>
              {m}
            </MenuItem>
          ))}
        </Select>
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
  display: flex;
  align-items: center;
  margin-left: 2vmin;
  margin-right: 2vmin;
  margin-bottom: 2vmin;
  min-height: 5vmin;
  justify-content: space-between;
`;

const CheckoutForm = ({
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
      <p>{title}</p>
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

export default CheckoutForm;
