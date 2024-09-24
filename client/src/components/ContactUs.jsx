import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../App'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    subscribe: false,
    description: ''
  });
  
  const user = useContext(userContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const contactData = {
      ...formData,
      email: user?.email || formData.email, // Use user email if available
    };

    axios.post('http://localhost:3001/contact', contactData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/contactus";
        }
      })
      .catch((err) => console.log(err));

    console.log('Contact form submitted:', contactData);
  };

  return (
    <div className="container my-5">
      <h2>Contact Us</h2>
      <p className="mb-4">We would love to hear from you! Please fill out the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <select
            className="form-select"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select your country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Dubai">Dubai</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="subscribe"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="subscribe">
            Subscribe to our newsletter
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Tell us something about yourself..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
