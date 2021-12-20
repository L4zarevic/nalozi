const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Decision = require('../models/decision');
const Report = require('../models/report');
const allowed_access = require('../util/allowed-access');
const { Op } = require('sequelize');

var isAddDecision = null;
var idDecision = null;
var isAddReport = null;
var idReport = null;

exports.getIndex = (req, res, next) => {
    allowed_access(req, res, next);

    let date_ob = new Date();
    let day = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let currentDate = year + "-" + month + "-" + day;
    let startDate = year + "-" + month + "-01";

    let countDecisionMonth = Decision.count({
        where: {
            date1: {
                [Op.between]: [startDate, currentDate]
            }
        }
    });

    let countReportMonth = Report.count({
        where: {
            date_departure: {
                [Op.between]: [startDate, currentDate]
            }
        }
    });

    let countAllDecision = Decision.count();
    let countAllReport = Report.count();

    Promise.all([countDecisionMonth, countReportMonth, countAllDecision, countAllReport]).then(([countDecisionMonth, countReportMonth, countAllDecision, countAllReport]) => {
        res.render('index', {
            user: req.session.name,
            countDecisionMonth: countDecisionMonth,
            countReportMonth: countReportMonth,
            countAllDecision: countAllDecision,
            countAllReport: countAllReport,
            path: '/nalozi/'
        });
    });

}

exports.getDecision = (req, res, next) => {
    allowed_access(req, res, next);

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
    allowed_access(req, res, next);

    if (req.params.decId != undefined) {
        idDecision = req.params.decId;
    }

    Decision.findOne({
        where: { id: idDecision },
        include: [{
            model: Employees,
            required: true
        },
        {
            model: Vehicle,
            required: true
        }],
        attributes: ['int_num', 'date1', 'employee.name', 'job_title', 'date2', 'relations', 'reasons', 'vehicle.car', 'vehicle.registration']

    }).then((decision) => {
        res.render('decision-preview', {
            user: req.session.name,
            dec: decision,
            isSuccessful: isAddDecision,
            path: '/decision-preview'
        });
        isAddDecision = null;
    })
        .catch(err => {
            console.log(err);
        });
}

exports.getPrintDecision = (req, res, next) => {
    allowed_access(req, res, next);

    Decision.findOne({
        where: { id: idDecision },
        include: [{
            model: Employees,
            required: true
        },
        {
            model: Vehicle,
            required: true
        }],
        attributes: ['int_num', 'date1', 'employee.name', 'job_title', 'date2', 'relations', 'reasons', 'vehicle.car', 'vehicle.registration']

    }).then((decision) => {
        res.render('print-decision', {
            user: req.session.name,
            dec: decision,
            path: '/print-decision'
        });
    })
        .catch(err => {
            console.log(err);
        });
}

exports.getReport = (req, res, next) => {
    allowed_access(req, res, next);

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
    allowed_access(req, res, next);

    if (req.params.repId != undefined) {
        idReport = req.params.repId;
    }

    Report.findOne({
        where: { id: idReport },
        include: [{
            model: Employees,
            required: true
        },
        {
            model: Vehicle,
            required: true
        }],
        attributes: ['date_departure', 'date_arrival', 'employee.name', 'reasons', 'vehicle.car', 'vehicle.registration']

    }).then((report) => {
        res.render('report-preview', {
            user: req.session.name,
            rep: report,
            isSuccessful: isAddReport,
            path: '/report-preview'
        });
        isAddReport = null;
    })
        .catch(err => {
            console.log(err);
        });

}

exports.getPrintReport = (req, res, next) => {
    allowed_access(req, res, next);

    Report.findOne({
        where: { id: idReport },
        include: [{
            model: Employees,
            required: true
        },
        {
            model: Vehicle,
            required: true
        }],
        attributes: ['date_departure', 'date_arrival', 'employee.name', 'reasons', 'vehicle.car', 'vehicle.registration']

    }).then((report) => {
        res.render('print-report', {
            user: req.session.name,
            rep: report,
            path: '/print-report'
        });
    })
        .catch(err => {
            console.log(err);
        });
}

exports.postAddDecision = (req, res, next) => {
    allowed_access(req, res, next);

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
        // console.log("Novi ID je: " + result.id)
        isAddDecision = true;
        res.redirect('/nalozi/decision-preview');
    }).catch(err => {
        isAddDecision = false;
        res.redirect('/nalozi/decision');
        console.log(err);
    });
}

exports.postAddReport = (req, res, next) => {
    allowed_access(req, res, next);

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
        res.redirect('/nalozi/report-preview');
    }).catch(err => {
        isAddReport = false;
        res.redirect('/nalozi/report');
        console.log(err);
    });

}
