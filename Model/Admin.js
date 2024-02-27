const { model, Schema } = require('mongoose');

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  nidNo: {
    type: String,
    required: true,
  },
});

const Admin = model('Admin', adminSchema, 'admins');
module.exports = Admin;
