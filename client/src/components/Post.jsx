import React , { useEffect, useState, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';
import './style.css';

function Post() {
  const {id} = useParams()
  const [post, setPost] = useState({})
  const navigate = useNavigate()
  const user = useContext(userContext)

  useEffect(() => {
    axios.get('http://localhost:3001/getpostbyid/'+id)
    .then(result => setPost(result.data))
    .catch(err => console.log(err))
  }, [])
   
  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deletepost/'+id)
    .then(result => {
        navigate('/home')
  })
    .catch(err => console.log(err))
  }
  
  return (
    <div className="container mt-5 mb-5">
        <div className="row">
            <h2 className="d-flex justify-content-center align-items-center mb-4">Edit Your Blog</h2>
            <div className="col-md-6 offset-md-3 text-center">
            <img 
                src={`http://localhost:3001/Images/${post.file}`} 
                alt="blog_capture" 
                className="img-fluid mb-3" 
                style={{ height: '400px', width: '600px', objectFit: 'cover' }} 
            />
            <h2 className="mb-2">{post.title}</h2>
            <p>{post.description}</p>
            </div>
            <div className="center-buttons">
              {
                user.email === post.email ?
                <>
                <Link to={`/editpost/${post._id}`}><button type="button" className="btn btn-primary me-2">Edit</button></Link>
                <button type="button" className="btn btn-danger" onClick={e => handleDelete(post._id)}>Delete</button>
                
                </> : <></>
              }
            </div>
        </div>
    </div>
  )
}

export default Post
