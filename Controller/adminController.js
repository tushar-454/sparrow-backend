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

module.exports = {
  getAdminInfo,
};
