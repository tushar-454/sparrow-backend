const User = require('../Model/User');
const jwt = require('jsonwebtoken');

/**
 * create a token for the user
 */
const createToken = async (req, res, next) => {
  const { emailOrPhone } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    const payload = { emailOrPhone, role: user.role };
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: 30,
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true, message: 'Token created successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * remove the token from the user
 */

const removeToken = async (_req, res, next) => {
  try {
    res.clearCookie('token', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true, message: 'Token removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createToken, removeToken };
