import { useState } from "react";
import { login, setToken } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setError(""); // Clear previous errors

    try {
      const res = await login({ username, password });
      const token = res.data.access;
      
      // 1. Store the token in localStorage to keep the user logged in
      localStorage.setItem("token", token);
      
      // 2. Set the token for future API calls
      setToken(token);
      
      // 3. Update the user state in App.jsx to show the dashboard
      setUser({ username });

    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

     <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}
