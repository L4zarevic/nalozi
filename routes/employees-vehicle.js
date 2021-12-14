const express = require('express');

const router = express.Router();
const empVehController = require('../controllers/employees-vehicle');

router.get('/add-employees-vehicle', empVehController.getEmployeesVehicle);
router.post('/add-employees', empVehController.postAddEmployees);
router.post('/add-vehicle', empVehController.postAddVehicle);

module.exports = router;