const Transactions = require('../Model/Transactions');

/**
 * create transaction controller
 */

const createTransaction = async (req, res, next) => {
  try {
    const {
      type,
      amount,
      senderName,
      senderNumber,
      agentName,
      agentNumber,
      receiverName,
      receiverNumber,
      time,
      wishText,
    } = req.body;
    const newTransaction = new Transactions({
      type,
      amount,
      senderName,
      senderNumber,
      receiverName,
      receiverNumber,
      time,
      wishText,
    });
    await newTransaction.save();
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get transactions by phone controller
 */

const getTransactionsByPhone = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const transactions = await Transactions.find({
      $or: [{ senderNumber: phone }, { receiverNumber: phone }],
    });
    res.status(200).json({
      success: true,
      message: 'User Transactions successfully',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get all transactions for admin
 */

const getAllTransactions = async (req, res, next) => {
  try {
    // get all transactions
    const transactions = await Transactions.find();
    res.status(200).json({
      success: true,
      message: 'All transactions found',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransactionsByPhone,
  getAllTransactions,
};
