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

module.exports = { createTransaction };
