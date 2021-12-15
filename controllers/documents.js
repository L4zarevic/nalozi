const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Decision = require('../models/decision');
const Report = require('../models/report');

var isAddDecision = null;
var idDecision = null;
var isAddReport = null;
var idReport = null;


const authenticate = function (req, res, next) {
    if (req.session.userid == undefined) {
        res.redirect('/logout');
    }
}

exports.getIndex = (req, res, next) => {
    authenticate(req, res, next);
    
    res.render('index', {
        user: req.session.name,
        path: '/'
    });
    
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

    authenticate(req, res, next);

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
    })
        .catch(err => {
            console.log(err);
        });

}

exports.getPrintReport = (req, res, next) => {
    authenticate(req, res, next);

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