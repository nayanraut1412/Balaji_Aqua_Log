import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import NewOrder from './Component/NewOrder';
import Login from './Pages/Login';
import PreviousOrders from './Component/PreviousOrder';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Login />} /> */}



        {/* Protected Routes */}
        <Route
          path="/neworder"
          element={
            <ProtectedRoute>
              <NewOrder />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/previous-orders"
          element={
            <ProtectedRoute>
              <PreviousOrders />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/neworder" element={<NewOrder />} /> */}
        {/* <Route path="/previous-orders" element={<PreviousOrders />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
