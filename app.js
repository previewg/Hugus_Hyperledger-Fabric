const express = require('express');
const path = require('path');
require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();
const indexRouter = require('./routes/index');
const storyRouter = require('./routes/story');
const models = require('./models');

const app = express();

models.sequelize.sync()
	.then(() => {
		console.log('✓ DB connection success.');
		console.log('  Press CTRL-C to stop\n');
	})
	.catch(err => {
		console.error(err);
		console.log('✗ DB connection error. Please make sure DB is running.');
		process.exit();
	});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/story', storyRouter);

app.use((req,res)=>{
	new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));

module.exports = app;
