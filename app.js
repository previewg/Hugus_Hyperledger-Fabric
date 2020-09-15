const express = require('express');
const path = require('path');
require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();
require('cors')();

// Router 설정
const indexRouter = require('./routes/index');
const storyRouter = require('./routes/story');
const models = require('./models');

const app = express();

// sequelize mariadb 연결
models.sequelize.sync()
	.then(() => {
		console.log('✓ DB 연결 성공');
	})
	.catch(err => {
		console.error(err);
		console.log('✗ DB 연결 에러');
		process.exit();
	});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Router 사용
app.use('/', indexRouter);
app.use('/story', storyRouter);

// 404 처리
app.use((req,res)=>{
	new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));
