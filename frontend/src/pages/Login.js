import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoaidng, error} = useLogin();
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    Navigate('/');
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" disabled={isLoaidng}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
};

export default Login;
