const bcrypt = require('bcrypt');
const Account = require('../Model/Account');
const User = require('../Model/User');

/**
 * Account Create Controller
 */

const createAccount = async (req, res, next) => {
  try {
    const { name, email, phone, role } = req.body;
    // check if the account already exists
    const isExist = await Account.findOne({ $or: [{ email }, { phone }] });
    if (isExist) {
      return res
        .status(409)
        .json({ success: false, message: 'Account exists' });
    }
    const newAccount = new Account({
      name,
      email,
      phone,
      role,
      balance: 40,
    });
    await newAccount.save();
    res.status(201).json({
      success: true,
      message: 'Account create successfully',
      data: newAccount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Account Login Controller
 */

const loginAccount = async (req, res, next) => {
  try {
    const { emailOrPhone, pin } = req.body;
    // check if the account exists
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Account not found' });
    }
    // Load hash from your password DB.
    bcrypt.compare(pin, user.pin).then(function (result) {
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Login successfully',
          data: user,
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid Credentials',
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount, loginAccount };
