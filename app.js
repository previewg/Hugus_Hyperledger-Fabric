const express = require('express');
const session = require('express-session');
const path = require('path');
const models = require('./models');
require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();
require('cors')();
const app = express();


// Router 설정
const authRouter = require('./routes/auth');

const storyRouter = require('./routes/story');

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
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Router 사용
app.use('/auth',authRouter);
app.use('/story', storyRouter);

// 404 처리
app.use((req,res)=>{
	new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

// mongodb에 세션 저장설정
const MongoStore = require('connect-mongo')(session);
app.use(session({
	secret : 'anyword',
	resave : false,
	saveUninitialized:false,
	store : new MongoStore({
		url : 'mongodb://192.168.99.100:37017/db01',
		collection : 'session'
	})
}))

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));
