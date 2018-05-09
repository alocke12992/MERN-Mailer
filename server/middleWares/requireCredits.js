// Prior to allowing client to send survey, check if they have enough credits
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: 'You do not have enough credits' });
  }
  next();
};
