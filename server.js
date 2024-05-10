const express = require('express');
const port = process.env.PORT || 8000;

const app = express();

let posts = [
  { id: 1, title: 'Post one' },
  { id: 2, title: 'Post two' },
  { id: 3, title: 'Post three' },
];

// common convention is to prefix your json api with /api
// get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// get single post
app.get('/api/posts/:id', (req, res) => {
  res.json(posts.filter((post) => post.id === parseInt(req.params.id)));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
