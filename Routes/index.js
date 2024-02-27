const router = require('express').Router();
const user = require('./user');
const account = require('./account');
const jwt = require('./jwt');

router.use('/api/v1/user', user);
router.use('/api/v1/account', account);
router.use('/api/v1/jwt', jwt);

module.exports = router;
