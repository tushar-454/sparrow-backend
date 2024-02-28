const bcrypt = require('bcrypt');
const User = require('../Model/User');
const Account = require('../Model/Account');
/**
 * user create controller
 */

const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, pin, role, nidNo } = req.body;
    // check if the user already exists
    const isExist = await User.findOne({
      $or: [{ email }, { phone }, { nidNo }],
    });
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

/**
 * Get account controller by phone
 */

const getAccount = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const account = await Account.findOne({ phone });
    if (account) {
      res
        .status(200)
        .json({ success: true, message: 'Account found', data: account });
    } else {
      res.status(404).json({ success: false, message: 'Account not found' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * cash out controller
 */

const cashOut = async (req, res, next) => {
  try {
    const { agentPhone, phone, amount } = req.body;
    const agent = await Account.findOne({ phone: agentPhone });
    const customer = await Account.findOne({ phone });
    const admin = await Account.findOne({ role: 'Admin' });
    const amountToNumber = Number(amount);
    if (customer.balance < amountToNumber + amountToNumber * 0.015) {
      return res
        .status(400)
        .json({ success: false, message: 'Insufficient balance' });
    }
    if (amountToNumber < 50) {
      return res
        .status(400)
        .json({ success: false, message: 'Minimum cash out amount is 50' });
    }
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: 'Agent not found' });
    }
    customer.balance =
      customer.balance - (amountToNumber + amountToNumber * 0.015);
    agent.balance = agent.balance + amountToNumber * 0.01;
    admin.balance = admin.balance + amountToNumber * 0.005;
    await customer.save();
    await agent.save();
    await admin.save();
    res.status(200).json({
      success: true,
      message: 'Cash out successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * send money controller
 */

const sendMoney = async (req, res, next) => {
  try {
    const { receiverPhone, phone, amount } = req.body;
    const receiver = await Account.findOne({ phone: receiverPhone });
    const customer = await Account.findOne({ phone });
    const admin = await Account.findOne({ role: 'Admin' });
    const amountToNumber = Number(amount);
    if (
      (amountToNumber > 100 && customer.balance < amountToNumber + 5) ||
      (amountToNumber < 100 && customer.balance < amountToNumber)
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Insufficient balance' });
    }
    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: 'Account not found' });
    }
    if (amountToNumber < 50) {
      return res
        .status(400)
        .json({ success: false, message: 'Minimum send money amount is 50' });
    }

    customer.balance =
      customer.balance -
      (amountToNumber > 100 ? amountToNumber + 5 : amountToNumber);
    receiver.balance = receiver.balance + amountToNumber;
    admin.balance = admin.balance + (amountToNumber > 100 ? 5 : 0);
    admin.income = admin.income + (amountToNumber > 100 ? 5 : 0);
    await customer.save();
    await receiver.save();
    await admin.save();
    res.status(200).json({
      success: true,
      message: 'Send money successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get user info controller
 */

const getUserInfo = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const user = await User.findOne({
      phone: phone,
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'User found',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserOneDeviceLogin = async (req, res, next) => {
  try {
    const { emailOrPhone } = req.params;
    const { isOneDeviceLoggedIn } = req.body;
    // find user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    user.isOneDeviceLoggedIn = isOneDeviceLoggedIn;
    await user.save();
    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAccount,
  cashOut,
  sendMoney,
  getUserInfo,
  updateUserOneDeviceLogin,
};
