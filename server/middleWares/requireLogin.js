// Prior to allowing client to access api routes, check if logged in
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Please Login' });
  }
  // next() is used to call next middleware once the function is complete
  next();
};
