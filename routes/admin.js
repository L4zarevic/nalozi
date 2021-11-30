const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/decision', adminController.getDecision);
router.get('/report', adminController.getReport);
router.get('/', adminController.getIndex);

module.exports = router;