import React, { useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { createContext, useEffect } from 'react';
import axios from 'axios';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import EditPost from './components/EditPost';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

export const userContext = createContext()

function App() {
  const [user, setUser] = useState({})
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/')
    .then(user => {
      // console.log(user);
      setUser(user.data)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/contactus' element={<ContactUs />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/create' element={<CreatePost />}></Route>
      <Route path='/post/:id' element={<Post />}></Route>
      <Route path='/editpost/:id' element={<EditPost />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
