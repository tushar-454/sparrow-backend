const router = require('express').Router();
const accountController = require('../Controller/accountController');

router.post('/create', accountController.createAccount);

module.exports = router;
