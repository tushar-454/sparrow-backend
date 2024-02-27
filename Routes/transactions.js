const router = require('express').Router();
const transactionsController = require('../Controller/transactionsController');

router.post('/create', transactionsController.createTransaction);

module.exports = router;
