const router = require('express').Router();
const agentController = require('../Controller/agentController');

router.patch('/cashIn', agentController.agentCashIn);

module.exports = router;
