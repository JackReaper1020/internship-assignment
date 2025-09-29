import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./dashboard";
import { setToken } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setUser({ loggedIn: true });
    }
  }, []);

  return (
    <div>
      <h1>My Internship App</h1>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
