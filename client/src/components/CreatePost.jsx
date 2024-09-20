import React, { useState, useContext } from 'react'
import axios from 'axios'
import { userContext } from '../App'

function CreatePost() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const user = useContext(userContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('email', user.email)
        formData.append('file', file)

        axios.post('http://localhost:3001/create', formData) 
        .then(res => {
          if(res.data === "Success") {
            window.location.href = "/home"
          }
        })
        .catch(err=> console.log(err))
    }

    const handleInputChange = (e) => {
        const lines = e.target.value.split('\n').length; // Count lines
        if (lines <= 8) {  // Limit to 8 lines
          setDescription(e.target.value);
        }
      };

  return (
    <div className='App'>
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <div className="form-group">
                    <label to="title">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder="Enter title" 
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group mt-4">
                    <label to="desc">Description</label>
                    <textarea 
                        className="form-control" 
                        name="desc" 
                        id="desc" 
                        cols="30" 
                        rows="4" 
                        placeholder="Enter description"
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                </div>
                <div className="form-group mt-4">
                    <label to="fileUpload"> Upload file </label>
                    <input 
                        type="file" 
                        className="form-control-file file"  
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4 " style={{ width: '200px' }}>Post</button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
