import colors from 'colors';

// middleware function
const logger = (req, res, next) => {
  const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
  };

  const color = methodColors[req.method] || 'white';

  console.log(
    `${req.method[color]} ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`
  );
  next();
};
export default logger;
