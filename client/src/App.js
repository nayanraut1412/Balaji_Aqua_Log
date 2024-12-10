import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NewOrder from './Component/NewOrder';
import Login from './Pages/Login';
import PreviousOrders from './Component/PreviousOrder';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/previous-orders" element={<PreviousOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
