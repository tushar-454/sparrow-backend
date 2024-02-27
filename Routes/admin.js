const router = require('express').Router();
const adminController = require('../Controller/adminController');

router.get('/info/:phone', adminController.getAdminInfo);

module.exports = router;
