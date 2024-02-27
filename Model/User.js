const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  pin: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  nidNo: {
    type: String,
    required: true,
    unique: true,
  },
  isActiveAccount: {
    type: Boolean,
    default: false,
  },
  isWithdrawRequest: {
    type: Boolean,
    default: false,
  },
  isBalanceRequest: {
    type: Boolean,
    default: false,
  },
  isOneDeviceLoggedIn: {
    type: Boolean,
    default: false,
  },
});
const User = model('User', userSchema, 'users');
module.exports = User;
