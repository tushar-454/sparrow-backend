const router = require('express').Router();
const user = require('./user');
const account = require('./account');
const transactions = require('./transactions');
const agent = require('./agent');
const admin = require('./admin');
const jwt = require('./jwt');

router.use('/api/v1/user', user);
router.use('/api/v1/account', account);
router.use('/api/v1/transactions', transactions);
router.use('/api/v1/agent', agent);
router.use('/api/v1/admin', admin);
router.use('/api/v1/jwt', jwt);

module.exports = router;
