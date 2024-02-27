const router = require('express').Router();
const userController = require('../Controller/userController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
