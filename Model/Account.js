const { model, Schema } = require('mongoose');

const accountSchema = new Schema({
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
  role: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
  },
  userBalance: {
    type: Number,
  },
});
const Account = model('Account', accountSchema, 'accounts');
module.exports = Account;
