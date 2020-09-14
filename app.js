const express = require('express');
const path = require('path');
require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req,res,next)=>{
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));

module.exports = app;
