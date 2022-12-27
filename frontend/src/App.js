import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import AppFrame from "./components/AppFrame";
import { Home } from "./components/Home";
import {
  Purchase,
  Customer,
  Employee,
  Order,
  Product,
  Customer_Service,
} from "./components/tables";

import "./index.css";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppFrame />}>
            <Route path="customer_services" element={<Customer_Service />} />
            <Route path="purchases" element={<Purchase />} />
            <Route path="customers" element={<Customer />} />
            <Route path="employees" element={<Employee />} />
            <Route path="products" element={<Product />} />
            <Route path="orders" element={<Order />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
