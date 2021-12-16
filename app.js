const express = require("express");

const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Employees = require('./models/employees');
const Vehicle = require('./models/vehicle');
const Users = require('./models/users');
const Decision = require('./models/decision');
const Report = require('./models/report');

const cookieParser = require("cookie-parser");
const session = require('express-session');

const loginRoutes = require('./routes/login');
const documentsRoutes = require('./routes/documents');
const empVehRoutes = require('./routes/employees-vehicle');
const historyRoutes = require('./routes/history');

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
app.use('/nalozi', express.static(__dirname + "/public"));

app.use('/nalozi', loginRoutes);
app.use('/nalozi', documentsRoutes);
app.use('/nalozi', empVehRoutes);
app.use('/nalozi', historyRoutes);

Decision.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Decision.belongsTo(Employees, { constraints: true, onDelete: 'CASCADE' });
Decision.belongsTo(Vehicle, { constraints: true, onDelete: 'CASCADE' });

Report.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Report.belongsTo(Employees, { constraints: true, onDelete: 'CASCADE' });
Report.belongsTo(Vehicle, { constraints: true, onDelete: 'CASCADE' });

Users.hasMany(Decision);
Employees.hasMany(Decision);
Vehicle.hasMany(Decision);

Users.hasMany(Report);
Employees.hasMany(Report);
Vehicle.hasMany(Report);

Users.hasMany(Employees);
Users.hasMany(Vehicle);

sequelize
    //.sync({ force: true })
    .sync()
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });
