module.exports = (someFunction) => (req, res, next) => {
  Promise.resolve(someFunction(req, res, next)).catch(next);
};
