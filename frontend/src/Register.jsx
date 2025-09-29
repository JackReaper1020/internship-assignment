import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register({ username, email, password });
      // After successful registration, send the user to the login page
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}
