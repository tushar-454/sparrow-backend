const bcrypt = require('bcrypt');
const User = require('../Model/User');
/**
 * user create controller
 */

const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, pin, role, nidNo } = req.body;
    // check if the user already exists
    const isExist = await User.findOne({ $or: [{ email }, { phone }] });
    if (isExist) {
      return res.status(409).json({ success: false, message: 'User exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pin, salt);
    const newCustomer = new User({
      name,
      email,
      phone,
      pin: hash,
      role,
      nidNo,
    });
    await newCustomer.save();
    res.status(201).json({
      success: true,
      message: 'User create successfully',
      data: newCustomer,
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
        res.status(200).json({
          success: true,
          message: 'User login successfully',
          data: userByPhone || userByEmail,
        });
      } else {
        res
          .status(209)
          .json({ success: false, message: 'Invalid Credentials' });
      }
    }
    res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
