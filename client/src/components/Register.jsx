import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', { username, email, password }) 
    .then(res => navigate('/login'))
    .catch(err=> console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '800px' }}>
        <h3 className="text-center mb-4">Sign Up</h3><br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
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
          
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-block w-100">Sign Up</button>
          </div>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
          </div>
          <div className="text-center mt-4">
            <Link to="/login"><button type="submit" className="btn btn-success btn-block w-100" >Log In</button></Link>
            
          </div>
          </form>
      </div>
    </div>
  )
}

export default Register






