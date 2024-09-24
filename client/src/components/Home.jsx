import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getposts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <div className="row">
        <h2 className="d-flex justify-content-center align-items-center mb-4">Latest Blog</h2>
        { 
          posts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className='home_page_post'>
              <div className="row mb-4">
                <div className="border p-3" style={{ borderRadius: '8px' }}>
                  <div className="row">
                    <div className="col-md-4">
                      <img 
                        src={`http://localhost:3001/Images/${post.file}`} 
                        alt="blog_capture" 
                        className="img-fluid" 
                        style={{ height: '300px', width: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                      <div className="post_text">
                        <h2 className="mb-2">{post.title}</h2>
                        <p className="text-muted m-0">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <p className='text-muted mb-1'>
                          <span className=''>Posted By:</span> {post.email}
                        </p>
                        <p>{post.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
