const router = require('express').Router();
const accountController = require('../Controller/accountController');

router.post('/create', accountController.createAccount);
router.post('/login', accountController.loginAccount);

module.exports = router;
