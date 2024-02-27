/**
 * user create controller
 */

const createUser = async (req, res, next) => {
  res.json({
    message: 'user created',
  });
};

module.exports = { createUser };
