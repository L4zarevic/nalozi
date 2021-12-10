const express = require("express");
const path = require('path');

const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Employees = require('./models/employees');
const Vehicle = require('./models/vehicle');
const Users = require('./models/users');
const Decision = require('./models/decision');

const cookieParser = require("cookie-parser");
const session = require('express-session');

const loginRoutes = require('./routes/login');
const documentsRoutes = require('./routes/documents');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
}
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(loginRoutes);
app.use(documentsRoutes);

Decision.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Decision);
Employees.hasMany(Decision);
Vehicle.hasMany(Decision);

sequelize
    //.sync({ force: true })
    .sync()
    .then(employees => {
        return Employees.findAll();
        // console.log(employees);
    })
    .then(vehicle => {
        return Vehicle.findAll();
        // console.log(vehicle);
    }).then(decision => {
        //return Decision.findAll();
    })
    .catch(err => {
        console.log(err);
    });

app.listen(3000);