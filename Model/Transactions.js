const { model, Schema } = require('mongoose');

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderNumber: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverNumber: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  wishText: {
    type: String,
  },
});

const Transaction = model('Transaction', transactionSchema, 'transactions');
module.exports = Transaction;
