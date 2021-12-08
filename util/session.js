const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const sequelize = require('./util/database');

const User = require('../models/users');
const client = redis.createClient();
const router = express.Router();
const app = express();


const username = req.body.user;
const password = req.body.pass;

User.findAll({
    where: {
        user: username,
        pass: password
    }
}).then(result => {
    app.use(session({
        secret: 'ssshhhhh',
        // create new redis store.
        store: new redisStore({ host: 'localhost', port: 6009, client: client, ttl: 260 }),
        saveUninitialized: false,
        resave: false
    }));
    res.redirect('/')
}).catch(err => {
    console.log(err);
});



module.exports = start_session;

