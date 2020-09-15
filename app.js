const express = require('express');
const path = require('path');
const {sequelize} = require('./models');
const cors = require('cors');
const port = 3000;

require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();
require('cors')();

// Router 설정
=======

const usersRouter = require('./routes/users');
>>>>>>> c1021b272e19470c2f91739d1dfe89709df40ffd
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

require('dotenv').config();
const app = express();
app.use(cors());

<<<<<<< HEAD
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

=======
sequelize.sync();
>>>>>>> c1021b272e19470c2f91739d1dfe89709df40ffd

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Router 사용
app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/story', storyRouter);

// 404 처리
app.use((req,res)=>{
	new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});
=======
app.use('/users', usersRouter);
app.use('/auth', authRouter);
>>>>>>> c1021b272e19470c2f91739d1dfe89709df40ffd

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));
