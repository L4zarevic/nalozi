//const session = require('express-session');
const Users = require('../models/users');

exports.postLogin = (req, res, next) => {
    const username = req.body.user;
    const password = req.body.pass;

    Users.findAll({
        where: {
            user: username,
            pass: password
        }
    }).then(users => {

        if (users.length > 0) {
            req.session.userid = users[0].id;
            req.session.name = users[0].name;
            req.session.save(function (err) {
                // session saved
                res.redirect('/nalozi/');
                return res.status(200).send();
            });
            //  res.redirect('/');
            console.log("SESIJA JE POCELA");

        } else {
            res.render('login', {
                isLogged: false,
                path: '/login'
            });
            //res.redirect(403, '/login');
            return res.status(403).send();
            //console.log("GRESKA U LOGOVANJU - SESIJA NIJE POCELA");
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
        console.log("SESIJA SE ZAVRSILA");
        res.redirect('/nalozi/login');
    });
}

