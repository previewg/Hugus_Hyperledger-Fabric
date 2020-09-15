const express = require('express');
const path = require('path');
const {sequelize} = require('./models');
const cors = require('cors');
const port = 3000;

require('cookie-parser')();
require('morgan')('dev');

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

app.listen(port, () => {
    console.log('Express is listening on port', port);
});


module.exports = app;
