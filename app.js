const express = require('express');
const path = require('path');
const {sequelize} = require('./models');
const cors = require('cors');
const port = 3000;

require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

require('dotenv').config();
const app = express();
app.use(cors());

sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT,console.log(`${process.env.PORT} port is listening...`));

module.exports = app;
