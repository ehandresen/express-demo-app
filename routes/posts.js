import express from 'express';
const router = express.Router();

let posts = [
  { id: 1, title: 'Post one' },
  { id: 2, title: 'Post two' },
  { id: 3, title: 'Post three' },
];

// get all posts
router.get('/', (req, res, next) => {
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
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

// create new post
router.post('/', (req, res, next) => {
  const title = req.body.title;

  if (!title) {
    const error = new Error(`Please add a title`);
    error.status = 400;
    return next(error);
  }

  posts.push({
    id: posts.length + 1,
    title: title,
  });
  res.status(201).json(posts);
});

// update post
router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id); // 'post' is now a reference to the original object in the array
  console.log(post);

  if (!post) {
    const error = new Error(`No post with id ${id}`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// delete post
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`No post with id ${id}`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
