import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');  
  const [description, setDescription] = useState(''); 
  const [file, setFile] = useState('');  
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    axios.put(`http://localhost:3001/editpost/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      console.log(res.data); 
      if (res.data.message === "Success") {
        navigate('/');
      }
       {
        navigate('/');
      }
    })
    .catch(err => console.log(err));
  
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/getpostbyid/${id}`)
      .then(result => {
        setTitle(result.data.title || '');  // Default to empty string if undefined
        setDescription(result.data.description || '');  
        setFile(result.data.file || '');  
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
          <div className="form-group mt-4">
            <label htmlFor="fileUpload">Upload new file</label>
            <input 
              type="file" 
              className="form-control-file"  
              onChange={e => setFile(e.target.files[0])}  // Set file to the uploaded one
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4" style={{ width: '200px' }}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
