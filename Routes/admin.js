const router = require('express').Router();
const adminController = require('../Controller/adminController');

router.get('/info/:phone', adminController.getAdminInfo);
router.get('/account/:phone', adminController.getAccountInfo);
router.patch('/userManage/:phone', adminController.userManage);
router.patch('/userRequestAction/:phone', adminController.userReauestAction);

module.exports = router;
