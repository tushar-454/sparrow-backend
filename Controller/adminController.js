const Account = require('../Model/Account');
const Admin = require('../Model/Admin');

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

module.exports = {
  getAdminInfo,
  getAccountInfo,
};
