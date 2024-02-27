const Account = require('../Model/Account');

/**
 * agent cash in controller
 */

const agentCashIn = async (req, res, next) => {
  try {
    const { receiverPhone, amount, phone } = req.body;
    const receiver = await Account.findOne({ phone: receiverPhone });
    const agent = await Account.findOne({ phone });
    const amountToNumber = Number(amount);
    if (!receiver || !agent) {
      return res.status(404).json({
        status: 404,
        message: 'Account not found',
      });
    }
    if (agent.balance < amountToNumber) {
      return res.status(400).json({
        status: 400,
        message: 'Insufficient balance',
      });
    }
    agent.balance = agent.balance - amountToNumber;
    receiver.balance = receiver.balance + amountToNumber;
    await agent.save();
    await receiver.save();
    res.status(200).json({
      status: 200,
      message: 'Cash in successfully',
      data: receiver,
      data1: agent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  agentCashIn,
};
