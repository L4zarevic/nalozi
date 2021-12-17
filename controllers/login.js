//const session = require('express-session');
const Users = require('../models/users');
const crypto = require('crypto');

let failedLogin = 0;

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
            if (req.body['g-recaptcha-response'] != undefined || req.body['g-recaptcha-response'] != '' || req.body['g-recaptcha-response'] != null) {
                const secretKey = "6LdbyAgaAAAAAOLrAvSqdlWUrNRoGcJm7iEBm8CA";
                const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
                request(verificationURL, function (error, response, body) {
                    body = JSON.parse(body);
                    if (body.success !== undefined && !body.success) {
                        res.redirect('/nalozi/logout');
                        // return res.json({ "responseError": "Failed captcha verification" });

                    }
                });
            }

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
            failedLogin += 1;
            res.render('login', {
                isLogged: false,
                failedLogin: failedLogin,
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
        failedLogin: null,
        path: '/login'
    });
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        console.log("SESIJA SE ZAVRSILA");
        res.redirect('/nalozi/login');
    });
}

