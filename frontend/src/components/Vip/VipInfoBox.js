import {
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Select,
  Input,
} from "@mui/material";
import styled from "styled-components";

const PureInput = ({
  label,
  autoComplete,
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
      variant={variant && variant}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      {inputType === "outlined" ? (
        <OutlinedInput
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          defaultValue={value}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : inputType === "standard" ? (
        <Input
          name={name}
          defaultValue={value}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : null}
    </FormControl>
  );
};
const Container = styled.div`
  margin-top: 3vmin;
  margin-left: 3vmin;
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

export default VipInfoBox;
