import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppFrame from './container/AppFrame';
import SignIn from './container/SignIn';
import Products from './container/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
          {/* <SignIn /> */}
          {/* <Route path="/main" element={<MainPage />} />
          <Route path="/products" element={<SearchPage />} />
          <Route path="/product/:id" element={<RestaurantPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
