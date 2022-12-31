import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppFrame from "./container/AppFrame";
import SignIn from "./container/SignIn";
import Products from "./container/Products";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: aliceblue;
`;
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Products />} /> */}
        <Route path="/" element={<AppFrame />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        {/* <SignIn /> */}
        {/* <Route path="/main" element={<MainPage />} />
          <Route path="/products" element={<SearchPage />} />
          <Route path="/product/:id" element={<RestaurantPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
