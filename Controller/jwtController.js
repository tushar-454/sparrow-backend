const jwt = require('jsonwebtoken');

/**
 * create a token for the user
 */
const createToken = async (req, res, next) => {
  const { emailOrPhone } = req.body;
  try {
    const payload = { emailOrPhone };
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
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
