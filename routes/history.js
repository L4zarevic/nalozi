const express = require('express');

const router = express.Router();
const historyController = require('../controllers/history');

router.get('/decision-history', historyController.getDecisionHistory);
router.get('/decision-history/:page', historyController.getDecisionHistory);
router.get('/report-history', historyController.getReportHistory);

module.exports = router;