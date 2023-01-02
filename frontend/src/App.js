import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppFrame from "./container/AppFrame";
import SignIn from "./container/SignIn";
import Products from "./container/Products";
import styled from "styled-components";
import MainPage from "./container/MainPage";
import ProductDetail from "./container/ProductDetail";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgb(242, 233, 223);
`;
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppContainer>
              <AppFrame />
            </AppContainer>
          }
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<ProductDetail />} />
          <Route path="/product/:id/*" element={<ProductDetail />} />
          {/* <Route path="/vip" element={<Vip />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
