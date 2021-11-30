exports.getIndex = (req, res, next) => {
    res.render('index', {
        path: '/'
    });
}

exports.getDecision = (req, res, next) => {
    res.render('decision', {
        path: '/decision'
    });
}

exports.getReport = (req, res, next) => {
    res.render('report', {
        path: '/report'
    });
}