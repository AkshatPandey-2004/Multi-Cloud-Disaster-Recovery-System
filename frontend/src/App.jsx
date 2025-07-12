import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
const API = import.meta.env.VITE_API_URL;

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogs = async () => {
  const res = await axios.get(`${API}/api/blogs`);
  setBlogs(res.data);
};

  const createBlog = async () => {
    if (!title.trim() || !content.trim()) return;
    await axios.post(`${API}/api/blogs`, { title, content });
    fetchBlogs();
    setTitle('');
    setContent('');
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app-container">
      <div className="blog-box">
        <h1 className="blog-title">📝 Blog App</h1>
        <input
          className="blog-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Blog Title"
        ></input>
        
        <textarea
          className="blog-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your blog content here..."
        />
        <button className="blog-button" onClick={createBlog}>
          Post Blog
        </button>

        <div className="blog-list">
          {blogs.length === 0 ? (
            <p className="blog-empty">No blogs yet. Be the first to post!</p>
          ) : (
            blogs.map(blog => (
              <div key={blog._id} className="blog-card">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
