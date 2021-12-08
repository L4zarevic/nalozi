const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Decision = require('../models/decision');

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
            path: '/decision'
        });
    })
        .catch(err => {
            console.log(err);
        }
        );
};
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
        relations: relations,
        reasons: reasons,
        id_vehicle: select_vehicle
    }).then(result => {
        res.redirect('/decision');
    })
        .catch(err => {
            console.log(err);
        });;

    //console.log(int_num + " " + date1 + " " + select_employees + " " + date2 + " " + relations + " " + reasons + " " + select_vehicle);

}