import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react'
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { email, password }) 
    .then(res => {
      if(res.data === "Success") {
        window.location.href = "/"
      }
    })
    .catch(err=> console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="card p-4" style={{ maxWidth: '400px', width: '800px' }}>
      <h3 className="text-center mb-4">Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center mt-3">
          <span>Don't have an account? <a href="/register" className="text-link">Sign Up</a></span>
        </div>
        <div className="text-center mt-4">
         <button type="submit" className="btn btn-success btn-block w-100">Log In</button>
        </div>
        </form>
    </div>
  </div>
  )
}

export default Login
