const bcrypt = require('bcrypt');
const User = require('../Model/User');
/**
 * user create controller
 */

const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, pin, role, nidNo } = req.body;
    const saltRounds = 10;
    bcrypt.hash(pin, saltRounds).then(async function (hash) {
      const newCustomer = new User({
        name,
        email,
        phone,
        pin: hash,
        role,
        nidNo,
      });
      await newCustomer.save();
      res.status(201).json({ message: 'success', data: newCustomer });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * user login controller
 */

const loginUser = async (req, res, next) => {
  try {
    const { phoneOrEmail, pin } = req.body;
    const userByPhone = await User.findOne({ phone: phoneOrEmail });
    const userByEmail = await User.findOne({ email: phoneOrEmail });
    if (userByPhone || userByEmail) {
      const match = await bcrypt.compare(
        pin,
        userByPhone?.pin || userByEmail?.pin
      );
      if (match) {
        res
          .status(200)
          .json({ message: 'success', data: userByPhone || userByEmail });
      } else {
        res.status(209).json({ message: 'Invalid Credentials' });
      }
    }
    res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
