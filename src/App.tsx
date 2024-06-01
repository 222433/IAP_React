import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './Map';
import { Menu } from './Menu/Menu';
import { ProductTable } from './ProductCell';
import { Login } from './Login';
import { Home } from './Home';
import PrivateRoutes from './PrivateRoutes';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux-configuration';
import { Provider } from 'react-redux';
import { Checkout } from './checkout/Checkout';
import { AddProduct } from './AddProduct';
function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" />
              <Route element={<Checkout />} path="/checkout" />
              <Route element={<AddProduct />} path="/addProduct" />
            </Route>
            <Route element={<Login />} path="/login" />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
