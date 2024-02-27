const router = require('express').Router();
const transactionsController = require('../Controller/transactionsController');

router.get('/all', transactionsController.getAllTransactions);
router.post('/create', transactionsController.createTransaction);
router.get('/:phone', transactionsController.getTransactionsByPhone);

module.exports = router;
