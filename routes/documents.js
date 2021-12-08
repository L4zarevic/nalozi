const express = require('express');

const router = express.Router();
const documentController = require('../controllers/documents');

router.get('/', documentController.getIndex);
router.get('/decision', documentController.getDecision);
router.get('/report', documentController.getReport);
router.post('/add-decision', documentController.postAddDecision);


module.exports = router;