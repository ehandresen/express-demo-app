import express from 'express';
import posts from './routes/posts.js';
const port = process.env.PORT || 8000;

const app = express();

// routes
// common convention is to prefix your json api with /api
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
