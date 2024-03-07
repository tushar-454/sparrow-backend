const router = require('express').Router();
const transactionsController = require('../Controller/transactionsController');
const verifyAdmin = require('../Middleware/verifyAdmin');
const verifyUser = require('../Middleware/verifyUser');

router.get('/all', verifyAdmin, transactionsController.getAllTransactions);
router.post('/create', verifyUser, transactionsController.createTransaction);
router.get(
  '/:phone',
  verifyUser,
  transactionsController.getTransactionsByPhone
);

module.exports = router;
