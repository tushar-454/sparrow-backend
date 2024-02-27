const router = require('express').Router();
const agentController = require('../Controller/agentController');

router.patch('/cashIn', agentController.agentCashIn);
router.patch('/requestAdmin', agentController.agentRequestInAdmin);

module.exports = router;
