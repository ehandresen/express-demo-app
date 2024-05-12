import express from 'express';
import posts from './routes/posts.js';
import logger from './middleware/loggerMiddleware.js';
import errorHandler from './middleware/error.js';
const port = process.env.PORT || 8000;

const app = express();

// body parser middleware
app.use(express.json()); // takes care of submitting raw json
app.use(express.urlencoded({ extended: false })); // typically form-data

// logger middleware
app.use(logger);

// routes
// common convention is to prefix your json api with /api
app.use('/api/posts', posts);

// errorHandler
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
