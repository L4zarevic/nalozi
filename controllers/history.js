const Decision = require('../models/decision');
const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Users = require('../models/users');
const Report = require('../models/report');
const allowed_access = require('../util/allowed-access');
const { Op } = require("sequelize");

exports.getDecisionHistory = (req, res, next) => {
    allowed_access(req, res, next);

    let query = "";
    let where = {}
    let filter_employees = 0;
    let filter_vehicle = 0;
    let filter_date_from = "";
    let filter_date_to = "";

    if (req.query.select_employees > 0) {
        where.employeeId = req.query.select_employees;
        query = "?select_employees=" + req.query.select_employees;
        filter_employees = req.query.select_employees;
    }
    if (req.query.select_vehicle > 0) {
        where.vehicleId = req.query.select_vehicle;
        if (query.length != 0) {
            query += "&select_vehicle=" + req.query.select_vehicle;
        } else {
            query = "?select_vehicle=" + req.query.select_vehicle;
        }
        filter_vehicle = req.query.select_vehicle;
    }

    if (req.query.date_from !== undefined && req.query.date_to !== undefined) {

        if (req.query.date_from !== "" && req.query.date_to !== "") {

            let date_from = req.query.date_from;
            let date_to = req.query.date_to;

            console.log("ispis date from je> " + date_from);
            console.log("ispis date to je> " + date_to);

            let startDate = new Date(date_from.split(".").reverse().join("-"));
            let endDate = new Date(date_to.split(".").reverse().join("-"));

            where.date1 = { [Op.between]: [startDate, endDate] };
            if (query.length != 0) {
                query += "&date_from=" + date_from + "&date_to=" + date_to;
            } else {
                query = "?date_from=" + date_from + "&date_to=" + date_to;
            }
            filter_date_from = req.query.date_from;
            filter_date_to = req.query.date_to;
        }
    }


    let employee = Employees.findAll();
    let vehicle = Vehicle.findAll();

    Promise.all([employee, vehicle]).then(([emp, veh]) => {
        employee = emp;
        vehicle = veh;
    }).catch(err => {
        console.log(err);
    });


    let page = req.params.page;
    if (page == undefined) {
        page = 1;
    }

    let limit = 10;   // number of records per page
    let offset = 0;
    Decision.findAndCountAll({ where: where })
        .then((data) => {
            //let page = 1;
            //let page = req.params.page;   // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            Decision.findAll({
                include: [{
                    model: Employees,
                    required: true
                },
                {
                    model: Vehicle,
                    required: true
                },
                {
                    model: Users,
                    required: true
                }],
                attributes: ['id', 'int_num', 'date1', 'employee.name', 'vehicle.car', 'user.name'],
                where: where,
                order: [
                    ['id', 'DESC']
                ],
                limit: limit,
                offset: offset,
                $sort: { id: 1 }
            })
                .then((decision) => {
                    res.render('decision-history', {
                        user: req.session.name,
                        dec: decision,
                        page: page,
                        pages: pages,
                        emp: employee,
                        veh: vehicle,
                        query: query,
                        filter_emp: filter_employees,
                        filter_veh: filter_vehicle,
                        filter_date_f: filter_date_from,
                        filter_date_t: filter_date_to,
                        path: '/decision-history'
                    })
                    // res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });


}

exports.getReportHistory = (req, res, next) => {
    allowed_access(req, res, next);

    let query = "";
    let where = {}
    let filter_employees = 0;
    let filter_vehicle = 0;
    let filter_date_from = "";
    let filter_date_to = "";

    if (req.query.select_employees > 0) {
        where.employeeId = req.query.select_employees;
        query = "?select_employees=" + req.query.select_employees;
        filter_employees = req.query.select_employees;
    }
    if (req.query.select_vehicle > 0) {
        where.vehicleId = req.query.select_vehicle;
        if (query.length != 0) {
            query += "&select_vehicle=" + req.query.select_vehicle;
        } else {
            query = "?select_vehicle=" + req.query.select_vehicle;
        }
        filter_vehicle = req.query.select_vehicle;
    }

    if (req.query.date_from !== undefined && req.query.date_to !== undefined) {

        if (req.query.date_from !== "" && req.query.date_to !== "") {

            let date_from = req.query.date_from;
            let date_to = req.query.date_to;

            let startDate = new Date(date_from.split(".").reverse().join("-"));
            let endDate = new Date(date_to.split(".").reverse().join("-"));

            where.date_departure = { [Op.between]: [startDate, endDate] };
            if (query.length != 0) {
                query += "&date_from=" + date_from + "&date_to=" + date_to;
            } else {
                query = "?date_from=" + date_from + "&date_to=" + date_to;
            }
            filter_date_from = req.query.date_from;
            filter_date_to = req.query.date_to;
        }
    }

    let employee = Employees.findAll();
    let vehicle = Vehicle.findAll();

    Promise.all([employee, vehicle]).then(([emp, veh]) => {
        employee = emp;
        vehicle = veh;
    }).catch(err => {
        console.log(err);
    });


    let page = req.params.page;
    if (page == undefined) {
        page = 1;
    }

    let limit = 10;   // number of records per page
    let offset = 0;
    Report.findAndCountAll({ where: where })
        .then((data) => {
            //let page = 1;
            //let page = req.params.page;   // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            Report.findAll({
                include: [{
                    model: Employees,
                    required: true
                },
                {
                    model: Vehicle,
                    required: true
                },
                {
                    model: Users,
                    required: true
                }],
                attributes: ['id', 'date_departure', 'date_arrival', 'employee.name', 'vehicle.car', 'user.name'],
                where: where,
                order: [
                    ['id', 'DESC']
                ],
                limit: limit,
                offset: offset,
                $sort: { id: 1 }
            })
                .then((report) => {
                    res.render('report-history', {
                        user: req.session.name,
                        rep: report,
                        page: page,
                        pages: pages,
                        emp: employee,
                        veh: vehicle,
                        query: query,
                        filter_emp: filter_employees,
                        filter_veh: filter_vehicle,
                        filter_date_f: filter_date_from,
                        filter_date_t: filter_date_to,
                        path: '/report-history'
                    })
                    // res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });

}