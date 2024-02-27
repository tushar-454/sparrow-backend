const Account = require('../Model/Account');
const Admin = require('../Model/Admin');
const User = require('../Model/User');

/**
 * get admin info controller
 */

const getAdminInfo = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const admin = await Admin.findOne({
      phone: phone,
    });
    if (!admin) {
      return res.status(404).json({
        status: 404,
        message: 'Admin not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Admin found',
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get account info controller
 */
const getAccountInfo = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const account = await Account.findOne({ phone });
    // get total account balance from Account model which role is not admin
    const totalAccountBalance = await Account.aggregate([
      { $match: { role: { $ne: 'Admin' } } },
      { $group: { _id: null, total: { $sum: '$balance' } } },
    ]);
    account.userBalance = totalAccountBalance[0].total ?? account.balance;
    await account.save();
    res.status(200).json({
      status: 200,
      message: 'Account found',
      data: account,
    });
    if (!account) {
      return res.status(404).json({
        status: 404,
        message: 'Admin not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Admin account found',
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * update user info controller
 */

const userManage = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const { isActiveAccount } = req.body;
    const user = await User.findOne({ phone });
    user.isActiveAccount = isActiveAccount;
    await user.save();
    res.status(200).json({
      status: 200,
      message: 'User account updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * user request admin action controller
 */

const userReauestAction = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const { requestType } = req.body;
    const user = await User.findOne({ phone });
    user[requestType] = false;
    await user.save();
    const userAccount = await Account.findOne({ phone });
    switch (requestType) {
      case 'balance':
        userAccount.balance = userAccount.balance + 100000;
        await userAccount.save();
        res.status(200).json({
          status: 200,
          message: 'User balance updated',
          data: userAccount,
        });
        break;
      case 'withdraw':
        if (userAccount.balance < 100000) {
          userAccount.balance = 0;
          await userAccount.save();
          return res.status(200).json({
            status: 200,
            message: 'User balance updated',
            data: userAccount,
          });
        }
        userAccount.balance = userAccount.balance - 100000;
        await userAccount.save();
        res.status(200).json({
          status: 200,
          message: 'User balance updated',
          data: userAccount,
        });
        break;
      default:
        res.status(200).json({
          status: 200,
          message: 'User balance updated',
          data: userAccount,
        });
        break;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminInfo,
  getAccountInfo,
  userManage,
  userReauestAction,
};
