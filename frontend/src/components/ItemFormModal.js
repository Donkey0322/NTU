import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useDB } from "../hooks/useDB";

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

const Default = (value) => {
  switch (typeof value) {
    case "number":
      return 0;
    case "string":
      return "";
  }
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => (
  <Grow ref={ref} {...props} unmountOnExit />
));

function ItemFormModal({ title, defaultFormData, move, open, setOpen }) {
  const { table, path, CRUD } = useDB();
  const initialValue = dayjs();
  const [value, setValue] = useState(initialValue);
  const [columns, setColumns] = useState([]);
  const [detail, setDetail] = useState(false);
  const Query = CRUD(move, path);

  let tempcolumns = [];
  if (move === "C") {
    for (const column in table[0].origin ? table[0].origin : table[0]) {
      tempcolumns.push(column);
    }
  } else {
    tempcolumns = Object.keys(
      defaultFormData.origin ? defaultFormData.origin : defaultFormData
    );
  }
  // setColumns(tempcolumns);
  var tempData = new Object();
  for (const column of tempcolumns) {
    tempData[column] = !Array.isArray(defaultFormData)
      ? defaultFormData.origin
        ? defaultFormData.origin[column]
        : defaultFormData[column]
      : column.includes("day") || column.includes("date")
      ? new Date()
      : Default(table[0].origin ? table[0].origin[column] : table[0][column]);
  }

  const sanitizedDefaultFormData = useMemo(() => tempData, [defaultFormData]);
  const [formData, setFormData] = useState(sanitizedDefaultFormData);

  useEffect(() => {
    if (!detail) {
      setFormData(sanitizedDefaultFormData);
      setColumns(tempcolumns);
    }
  }, [sanitizedDefaultFormData]);

  const [errors, setErrors] = useState({
    name: false,
    amount: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        typeof sanitizedDefaultFormData[name] === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    const a = new Object();
    setValue(date);
    a[name] = date;
    setFormData((prev) => ({
      ...prev,
      ...a,
    }));
  };

  const handleClose = () => {
    setFormData(sanitizedDefaultFormData);
    setErrors({
      name: false,
      amount: false,
    });
    setOpen(false);
    setDetail(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let reqData = new Object();
    for (const column of columns) {
      reqData[column] =
        typeof formData[column] === "number"
          ? parseInt(formData[column], 10)
          : formData[column];
    }
    Query(reqData);
    if (table[0].origin && move === "C") {
      setDetail(true);
      tempcolumns = [];
      for (const column in table[0].detail[0]) {
        tempcolumns.push(column);
      }

      tempData = new Object();
      for (const column of tempcolumns) {
        tempData[column] = column.includes("day")
          ? new Date()
          : Default(table[0].detail[0][column]);
      }
      console.log(tempcolumns, tempData);
      setColumns(tempcolumns);
      console.log(tempData);
      setFormData(tempData);
    } else setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <div className="flex flex-col gap-4 px-10">
          {Object.keys(formData).length > 0 &&
            columns.length > 0 &&
            columns.map((column, index) =>
              column.includes("id") ||
              column.includes("code") ||
              column.includes("total") ? null : column === "gender" ? (
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="category-select-label">Gender</InputLabel>
                  <Select
                    name="gender"
                    label="gender"
                    labelId="gender-select-label"
                    defaultValue={sanitizedDefaultFormData.gender}
                    onChange={handleInputChange}
                    data-cy="form-category"
                  >
                    <MenuItem value="male">male</MenuItem>
                    <MenuItem value="female">female</MenuItem>
                  </Select>
                </FormControl>
              ) : column.includes("day") || column.includes("date") ? (
                <FormControl key={index}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      renderInput={(props) => (
                        <TextField {...props} name="date" />
                      )}
                      value={value}
                      label={column}
                      onChange={handleDateChange(column)}
                    />
                  </LocalizationProvider>
                </FormControl>
              ) : typeof formData[column] === "string" ? (
                <FormControl variant="filled" key={index}>
                  <Input
                    name={column}
                    placeholder={column}
                    autoFocus
                    onChange={handleInputChange}
                    required
                    size="medium"
                    defaultValue={sanitizedDefaultFormData[column]}
                    data-cy="form-name"
                  />
                  {/* {errors.name && (
                      <HelperText color="error">Name is required</HelperText>
                    )} */}
                </FormControl>
              ) : typeof formData[column] === "number" ? (
                <FormControl sx={{ width: 200 }} key={index}>
                  <Input
                    name={column}
                    type="number"
                    placeholder={column}
                    onChange={handleInputChange}
                    required
                    defaultValue={
                      Array.isArray(defaultFormData)
                        ? ""
                        : sanitizedDefaultFormData[column]
                    }
                    data-cy="form-amount"
                  />
                  {/* {errors.amount && (
                  <HelperText color="error">Amount is required</HelperText>
                )} */}
                </FormControl>
              ) : null
            )}

          {/* <FormControl sx={{ width: 200 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              name="category"
              label="Category"
              labelId="category-select-label"
              defaultValue={sanitizedDefaultFormData.category}
              onChange={handleInputChange}
              data-cy="form-category"
            >
              <MenuItem value="FOOD">Food</MenuItem>
              <MenuItem value="TRANSPORT">Transport</MenuItem>
              <MenuItem value="HOUSING">Housing</MenuItem>
              <MenuItem value="UTILITIES">Utilities</MenuItem>
              <MenuItem value="HEALTH">Health</MenuItem>
              <MenuItem value="ENTERTAINMENT">Entertainment</MenuItem>
              <MenuItem value="CLOTHING">Clothing</MenuItem>
              <MenuItem value="EDUCATION">Education</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
              <MenuItem value="INCOME">Income</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(props) => <TextField {...props} name="date" />}
                label="Date"
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <TextField
              name="description"
              multiline
              rows={4}
              placeholder="description"
              onChange={handleInputChange}
              data-cy="form-description"
            />
          </FormControl> */}
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="error"
          tabIndex={-1}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            handleSubmit(e);
          }}
          data-cy="form-submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemFormModal;
