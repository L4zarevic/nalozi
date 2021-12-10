const express = require('express');

const router = express.Router();
const documentController = require('../controllers/documents');

router.get('/', documentController.getIndex);
router.get('/decision', documentController.getDecision);
router.get('/decision-preview', documentController.getDecisionPreview);
router.get('/print-decision',documentController.getPrintDecision);
router.get('/report', documentController.getReport);
router.get('/report-preview', documentController.getReportPreview);
router.post('/add-decision', documentController.postAddDecision);
router.post('/add-report', documentController.postAddReport);



module.exports = router;