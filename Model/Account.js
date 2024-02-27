const { model, Schema } = require('mongoose');

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = model('Account', accountSchema, 'accounts');
module.exports = Account;
