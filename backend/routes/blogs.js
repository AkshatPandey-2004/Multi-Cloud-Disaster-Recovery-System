import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
