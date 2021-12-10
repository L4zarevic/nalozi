const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Decision = require('../models/decision');
const Report = require('../models/report');

var isAddDecision = null;
var idDecision = null;
var isAddReport = false;
var idReport = null;


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
            isSuccessful: isAddDecision,
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
    let employeeId;
    let job_title;
    let date2;
    let relations;
    let reasons;
    let vehicleId;
    let employees_name;
    let vehicle_car;
    let vehicle_registration;
    let newdate1;
    let newdate2;

    Decision.findByPk(idDecision).then(decision => {
        int_num = decision.int_num;
        date1 = decision.date1;
        employeeId = decision.employeeId;
        job_title = decision.job_title;
        date2 = decision.date2;
        relations = decision.relations;
        reasons = decision.reasons;
        vehicleId = decision.vehicleId;

        newdate1 = date1.split("-").reverse().join(".");
        newdate2 = date2.split("-").reverse().join(".");

    }).then(() => {
        Employees.findByPk(employeeId)
            .then(employees => {
                employees_name = employees.name;

                Vehicle.findByPk(vehicleId)
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
                            isSuccessful: isAddDecision,
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
    let employeeId;
    let job_title;
    let date2;
    let relations;
    let reasons;
    let vehicleId;
    let employees_name;
    let vehicle_car;
    let vehicle_registration;
    let newdate1;
    let newdate2;

    Decision.findByPk(idDecision).then(decision => {
        int_num = decision.int_num;
        date1 = decision.date1;
        employeeId = decision.employeeId;
        job_title = decision.job_title;
        date2 = decision.date2;
        relations = decision.relations;
        reasons = decision.reasons;
        vehicleId = decision.vehicleId;

        newdate1 = date1.split("-").reverse().join(".");
        newdate2 = date2.split("-").reverse().join(".");

    }).then(() => {
        Employees.findByPk(employeeId)
            .then(employees => {
                employees_name = employees.name;

                Vehicle.findByPk(vehicleId)
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
    const emp = Employees.findAll();
    const veh = Vehicle.findAll();

    Promise.all([emp, veh]).then(([employees, vehicle]) => {
        res.render('report', {
            user: req.session.name,
            emp: employees,
            veh: vehicle,
            isSuccessful: isAddReport,
            path: '/report'
        })
    })
        .catch(err => {
            console.log(err);
        }
        );
}

exports.getReportPreview = (req, res, next) => {
    authenticate(req, res, next);

    let date_departure;
    let employeeId;
    let date_arrival;
    let reasons;
    let vehicleId;
    let employees_name;
    let vehicle_car;
    let vehicle_registration;
    let newdate_departure;
    let newdate_arrival;

    Report.findByPk(idReport).then(report => {

        date_departure = report.date_departure;
        employeeId = report.employeeId;
        date_arrival = report.date_arrival;
        reasons = report.reasons;
        vehicleId = report.vehicleId;

        newdate_departure = date_departure.split("-").reverse().join(".");
        newdate_arrival = date_arrival.split("-").reverse().join(".");

    }).then(() => {
        Employees.findByPk(employeeId)
            .then(employees => {
                employees_name = employees.name;

                Vehicle.findByPk(vehicleId)
                    .then(vehicle => {
                        vehicle_car = vehicle.car;
                        vehicle_registration = vehicle.registration;

                        res.render('report-preview', {
                            user: req.session.name,
                            date_departure: newdate_departure,
                            employees_name: employees_name,
                            date_arrival: newdate_arrival,
                            reasons: reasons,
                            vehicle_car: vehicle_car,
                            vehicle_registration: vehicle_registration,
                            isSuccessful: isAddReport,
                            path: '/report-preview'
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
        userId: req.session.userid,
        int_num: int_num,
        date1: newdate1,
        employeeId: select_employees,
        date2: newdate2,
        job_title: job_title,
        relations: relations,
        reasons: reasons,
        vehicleId: select_vehicle
    }).then((result) => {
        idDecision = result.id;
        console.log("Novi ID je: " + result.id)
        isAddDecision = true;
        res.redirect('/decision-preview');
    }).catch(err => {
        isAddDecision = false;
        res.redirect('/decision');
        console.log(err);
    });
}

exports.postAddReport = (req, res, next) => {
    const date_departure = req.body.date_departure;
    const date_arrival = req.body.date_arrival;
    const select_employees = req.body.select_employees_rp;
    const reasons = req.body.reasons;
    const select_vehicle = req.body.select_vehicle_rp;

    var newdate_departure = date_departure.split(".").reverse().join("-");
    var newdate_arrival = date_arrival.split(".").reverse().join("-");

    Report.create({
        userId: req.session.userid,
        date_departure: newdate_departure,
        employeeId: select_employees,
        date_arrival: newdate_arrival,
        reasons: reasons,
        vehicleId: select_vehicle
    }).then((result) => {
        idReport = result.id;
        //console.log("Novi ID je: " + result.id)
        isAddReport = true;
        res.redirect('/report-preview');
    }).catch(err => {
        isAddReport = false;
        res.redirect('/report');
        console.log(err);
    });

}