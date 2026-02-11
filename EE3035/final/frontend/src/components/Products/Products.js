//在 Product 上新增 sort bar

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Product from "./Product";

const Products = ({
  sort,
  handleSortChange,
  products,
  handleNavigateToDetail,
}) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120, mb: "2vmin" }} size="small">
        <InputLabel id="demo-select-small">排序</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={sort}
          label="Age"
          onChange={handleSortChange}
        >
          <MenuItem value={"low_to_high"}>價格由低到高</MenuItem>
          <MenuItem value={"high_to_low"}>價格由高到低</MenuItem>
          <MenuItem value={"sale"}>銷量由高到低</MenuItem>
        </Select>
      </FormControl>
      <Product
        products={products}
        handleNavigateToDetail={handleNavigateToDetail}
      />
    </>
  );
};

export default Products;
