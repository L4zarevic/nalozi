const Decision = require('../models/decision');
const Employees = require('../models/employees');
const Vehicle = require('../models/vehicle');
const Users = require('../models/users');

exports.getDecisionHistory = (req, res, next) => {

    let page = req.params.page;
    if (page == undefined) {
        page = 1;
    }

    let limit = 10;   // number of records per page
    let offset = 0;
    Decision.findAndCountAll()
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
                limit: limit,
                offset: offset,
                $sort: { id: 1 }
            })
                .then((decision) => {
                    res.render('decision-history', {
                        user: req.session.name,
                        int_num: decision.int_num,
                        dec: decision,
                        page: page,
                        pages: pages,
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

}