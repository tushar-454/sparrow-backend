/**
 * Account Create Controller
 */

const Account = require('../Model/Account');

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

module.exports = { createAccount };
