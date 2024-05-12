import express from 'express';
const router = express.Router();

let posts = [
  { id: 1, title: 'Post one' },
  { id: 2, title: 'Post two' },
  { id: 3, title: 'Post three' },
];

// get all posts
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

// get single post
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`No post with id ${id}`);
    return next(error);
  }

  res.status(200).json(post);
});

// create new post
router.post('/', (req, res) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({ msg: 'Please add a title' });
  }

  posts.push({
    id: posts.length + 1,
    title: title,
  });
  res.status(201).json(posts);
});

// update post
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id); // 'post' is now a reference to the original object in the array
  console.log(post);

  if (!post) {
    return res.status(404).json({ msg: `No post with id ${id}` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// delete post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ msg: `No post with id ${id}` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
