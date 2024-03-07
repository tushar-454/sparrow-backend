const User = require('../Model/User');
const jwt = require('jsonwebtoken');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are not authenticate', data: [] });
    }
    const decoded = await jwt.decode(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      $or: [{ email: decoded.emailOrPhone }, { phone: decoded.emailOrPhone }],
    });
    if (!user || user.role !== 'Admin') {
      return res.status(401).json({ message: 'Unauthorized', data: [] });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyAdmin;
