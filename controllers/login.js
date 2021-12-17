const Users = require('../models/users');
const crypto = require('crypto');

exports.postLogin = (req, res, next) => {
    const username = req.body.user;
    const password = req.body.pass;

    const hash_password = crypto.createHash('md5').update(password).digest('hex');

    Users.findAll({
        where: {
            user: username,
            pass: hash_password
        }
    }).then(users => {

        if (users.length > 0) {

            req.session.userid = users[0].id;
            req.session.name = users[0].name;

            req.session.save(function (err) {
                res.redirect('/nalozi/');
                return res.status(200).send();
            });

        } else {
            res.render('login', {
                isLogged: false,
                path: '/login'
            });
            return res.status(403).send();
        }
    }).catch(err => {
        console.log(err);
    });
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        isLogged: null,
        path: '/login'
    });
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect('/nalozi/login');
    });
}

