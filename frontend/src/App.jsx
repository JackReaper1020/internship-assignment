import React, { useState, useEffect } from "react";
import Login from "./login";
import Dashboard from "./dashboard";
import { setToken } from "./api";

function App() {
  const [user, setUser] = useState(null);

  // This effect runs once when the app starts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If a token is found, set it for API calls
      setToken(token);
      // You can also decode the token to get user info if you want
      // For now, we'll just set a placeholder user object
      setUser({ loggedIn: true });
    }
  }, []);

  return (
    <div>
      <h1>My Internship App</h1>
      {user ? <Dashboard setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
