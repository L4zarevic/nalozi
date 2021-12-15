const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const allowed_access = require('../util/allowed-access');

var isAddEmployees = null;
var isAddVehicle = null;

exports.getEmployeesVehicle = (req, res, next) => {
    allowed_access(req, res, next);

    const emp = Employees.findAll();
    const veh = Vehicle.findAll();

    Promise.all([emp, veh]).then(([employees, vehicle]) => {
        res.render('add-employees-vehicle', {
            user: req.session.name,
            emp: employees,
            veh: vehicle,
            isSuccessfulEmp: isAddEmployees,
            isSuccessfulVeh: isAddVehicle,
            path: '/add-employees-vehicle'
        })
        isAddEmployees = null;
        isAddVehicle = null;
    })
        .catch(err => {
            console.log(err);
        }
        );
}

exports.postAddEmployees = (req, res, next) => {
    allowed_access(req, res, next);

    const employeesName = req.body.add_employees;

    Employees.create({
        userId: req.session.userid,
        name: employeesName
    }).then((result) => {
        //idReport = result.id;
        //console.log("Novi ID je: " + result.id)
        isAddEmployees = true;
        res.redirect('/add-employees-vehicle');
    }).catch(err => {
        isAddEmployees = false;
        res.redirect('/add-employees-vehicle');
        console.log(err);
    });
}

exports.postAddVehicle = (req, res, next) => {
    allowed_access(req, res, next);
    
    const vehicleCar = req.body.add_vehicle_car;
    const vehicleRegistration = req.body.add_vehicle_registration;

    Vehicle.create({
        userId: req.session.userid,
        car: vehicleCar,
        registration: vehicleRegistration
    }).then((result) => {
        //idReport = result.id;
        //console.log("Novi ID je: " + result.id)
        isAddVehicle = true;
        res.redirect('/add-employees-vehicle');
    }).catch(err => {
        isAddVehicle = false;
        res.redirect('/add-employees-vehicle');
        console.log(err);
    });
}