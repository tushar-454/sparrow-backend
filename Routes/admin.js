const router = require('express').Router();
const adminController = require('../Controller/adminController');

router.get('/info/:phone', adminController.getAdminInfo);
router.get('/account/:phone', adminController.getAccountInfo);

module.exports = router;
