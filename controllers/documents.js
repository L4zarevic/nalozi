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

    let int_num;
    let date1;
    let id_employees;
    let job_title;
    let date2;
    let relations;
    let reasons;
    let id_vehicle;
    let employees_name = "";
    let vehicle_car = "";
    let vehicle_registration = "";
    let newdate1;
    let newdate2;

    Decision.findByPk(idDecision).then(decision => {
        int_num = decision.int_num;
        date1 = decision.date1;
        id_employees = decision.id_employees;
        job_title = decision.job_title;
        date2 = decision.date2;
        relations = decision.relations;
        reasons = decision.reasons;
        id_vehicle = decision.id_vehicle;

        newdate1 = date1.split("-").reverse().join(".");
        newdate2 = date2.split("-").reverse().join(".");

    }).then(() => {
        Employees.findByPk(id_employees)
            .then(employees => {
                employees_name = employees.name;

                Vehicle.findByPk(id_vehicle)
                    .then(vehicle => {
                        vehicle_car = vehicle.car;
                        vehicle_registration = vehicle.registration;

                        res.render('decision-preview', {
                            user: req.session.name,
                            int_num: int_num,
                            date1: newdate1,
                            employees_name: employees_name,
                            date2: newdate2,
                            job_title: job_title,
                            relations: relations,
                            reasons: reasons,
                            vehicle_car: vehicle_car,
                            vehicle_registration: vehicle_registration,
                            isSuccessful: isAdd,
                            path: '/decision-preview'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });

    })
        .catch(err => {
            console.log(err);
        });
}

exports.getPrintDecision = (req, res, next) => {
    authenticate(req, res, next);

    let int_num;
    let date1;
    let id_employees;
    let job_title;
    let date2;
    let relations;
    let reasons;
    let id_vehicle;
    let employees_name;
    let vehicle_car;
    let vehicle_registration;
    let newdate1;
    let newdate2;

    Decision.findByPk(idDecision).then(decision => {
        int_num = decision.int_num;
        date1 = decision.date1;
        id_employees = decision.id_employees;
        job_title = decision.job_title;
        date2 = decision.date2;
        relations = decision.relations;
        reasons = decision.reasons;
        id_vehicle = decision.id_vehicle;

        newdate1 = date1.split("-").reverse().join(".");
        newdate2 = date2.split("-").reverse().join(".");

    }).then(() => {
        Employees.findByPk(id_employees)
            .then(employees => {
                employees_name = employees.name;

                Vehicle.findByPk(id_vehicle)
                    .then(vehicle => {
                        vehicle_car = vehicle.car;
                        vehicle_registration = vehicle.registration;

                        res.render('print-decision', {
                            int_num: int_num,
                            date1: newdate1,
                            employees_name: employees_name,
                            date2: newdate2,
                            job_title: job_title,
                            relations: relations,
                            reasons: reasons,
                            vehicle_car: vehicle_car,
                            vehicle_registration: vehicle_registration,
                            path: '/print-decision'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
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

    var newdate1 = date1.split(".").reverse().join("-");
    var newdate2 = date2.split(".").reverse().join("-");

    Decision.create({
        id_user: req.session.userid,
        int_num: int_num,
        date1: newdate1,
        id_employees: select_employees,
        date2: newdate2,
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
        isAdd = false;
        res.redirect('/decision');
        console.log(err);
    });
}