const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Decision = require('../models/decision');

var isAdd = null;
var idDecision = null;

const authenticate = function (req, res, next) {
    if (req.session.userid == undefined) {
        res.redirect('/login');
    }
}

exports.getIndex = (req, res, next) => {
    //  if (req.session.userid == undefined) {
    //     res.redirect('/login');
    // } else {
    authenticate(req, res, next);
    res.render('index', {
        user: req.session.name,
        path: '/'
    });
    // }
}

exports.getDecision = (req, res, next) => {
    authenticate(req, res, next);
    const emp = Employees.findAll();
    const veh = Vehicle.findAll();

    Promise.all([emp, veh]).then(([employees, vehicle]) => {
        res.render('decision', {
            user: req.session.name,
            emp: employees,
            veh: vehicle,
            isSuccessful: isAdd,
            path: '/decision'
        })
    })
        .catch(err => {
            console.log(err);
        }
        );
};


exports.getDecisionPreview = (req, res, next) => {
    authenticate(req, res, next);
    let employees_name = null;
    let vehicle_car = null;
    let vehicle_registration = null;

    let int_num = null;
    let date1 = null;
    let id_employees;
    let job_title = null;
    let date2 = null;
    let relations = null;
    let reasons = null;
    let id_vehicle = null;

    Decision.findByPk(idDecision).then(decisions => {
        int_num = decisions.int_num;
        date1 = decisions.date1;
        id_employees = decisions.id_employees;
        job_title = decisions.job_title;
        date2 = decisions.date2;
        relations = decisions.relations;
        reasons = decisions.reasons;
        id_vehicle = decisions.id_vehicle;

    }).then(() => {
        Employees.findByPk(id_employees)
            .then(employees => {
                employees_name = employees.name;
                console.log("OVo je 1. ispis zaposlenog" + employees_name);
                console.log("OVo je 2. ispis zaposlenog" + employees.name);
            })
            .catch(err => {
                console.log(err);
            })
    }).then(() => {
        Vehicle.findByPk(id_vehicle)
            .then(vehicle => {
                vehicle_car = vehicle.car;
                vehicle_registration = vehicle.registration;
            })
            .catch(err => {
                console.log(err);
            })
    }).then(() => {
        res.render('decision-preview', {
            user: req.session.name,
            int_num: int_num,
            date1: date1,
            employees_name: employees_name,
            date2: date2,
            job_title: job_title,
            relations: relations,
            reasons: reasons,
            vehicle_car: vehicle_car,
            vehicle_registration: vehicle_registration,
            path: '/decision-preview'
        });
    })
        .catch(err => {
            console.log(err);
        });
}

exports.getReport = (req, res, next) => {
    authenticate(req, res, next);
    res.render('report', {
        user: req.session.name,
        path: '/report'
    });
}

exports.postAddDecision = (req, res, next) => {
    const int_num = req.body.int_num;
    const date1 = req.body.date1;
    const select_employees = req.body.select_employees;
    const job_title = req.body.job_title;
    const date2 = req.body.date2;
    const relations = req.body.relations;
    const reasons = req.body.reasons;
    const select_vehicle = req.body.select_vehicle;

    Decision.create({
        id_user: req.session.userid,
        int_num: int_num,
        date1: date1,
        id_employees: select_employees,
        date2: date2,
        job_title: job_title,
        relations: relations,
        reasons: reasons,
        id_vehicle: select_vehicle
    }).then((result) => {
        idDecision = result.id;
        console.log("Novi ID je: " + result.id)
        isAdd = true;
        res.redirect('/decision-preview');
    }).catch(err => {
        console.log(err);
    });
}