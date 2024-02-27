const router = require('express').Router();
const user = require('./user');

router.use('/api/v1', user);

module.exports = router;
