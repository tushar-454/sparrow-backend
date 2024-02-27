const router = require('express').Router();
const userController = require('../Controller/userController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/account/:phone', userController.getAccount);
router.patch('/account/cashout', userController.cashOut);
router.patch('/account/sendmoney', userController.sendMoney);

module.exports = router;
