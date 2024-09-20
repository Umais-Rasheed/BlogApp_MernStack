import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditPost() {
  const [title, setTitle] = useState('');  // Initialize with an empty string
  const [description, setDescription] = useState('');  // Initialize with an empty string
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/editpost/${id}`, { title, description })
      .then(res => {
        if (res.data === "Success") {
          window.location.href = "/home";
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/getpostbyid/${id}`)
      .then(result => {
        setTitle(result.data.title || '');  // Default to empty string if undefined
        setDescription(result.data.description || '');  // Default to empty string if undefined
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className='App'>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
          <h2>Update Post</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              placeholder="Enter title" 
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="desc">Description</label>
            <textarea 
              className="form-control" 
              name="desc" 
              id="desc" 
              cols="30" 
              rows="4" 
              placeholder="Enter description"
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4" style={{ width: '200px' }}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
