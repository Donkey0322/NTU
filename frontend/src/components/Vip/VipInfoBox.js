import { InputLabel, FormControl, OutlinedInput, Input } from "@mui/material";
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
      <InputLabel htmlFor={label} >{label}</InputLabel>
      {inputType === "outlined" ? (
        <OutlinedInput
          name={name}
          autoComplete={autoComplete && autoComplete}
          label={label}
          value={value}
          onChange={onChange}
          defaultValue={value}
          sx={{  width: '35ch' }}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : inputType === "standard" ? (
        <Input
          name={name}
          defaultValue={value}
          autoComplete={autoComplete && autoComplete}
          label={label}
          onChange={onChange}
          sx={{  width: '35ch' }}
          value={value}
          color={error && error[name] ? "error" : "primary"}
        />
      ) : null}
    </FormControl>
  );
};
const Container = styled.div`
  margin-top: 5vmin;
  margin-left: 35% ;
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
      <p style={{width: "min(15%, 15vmin)", height: "min(10%, 10vmin)", padding: "0.5% 0%",
      fontSize: "2vmin", backgroundColor: "LavenderBlush",borderRadius: "20px",
       color: "IndianRed", textAlign: "center"}}>{title}</p>
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
