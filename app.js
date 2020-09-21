'use strict';
const express = require('express');
const session = require('express-session');
const path = require('path');
const models = require('./models');
const multer = require('multer');
const fs =require('fs');

require('cookie-parser')();
require('morgan')('dev');
require('dotenv').config();
require('cors')();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Multer 설정
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const upload = module.exports =multer({
	storage:multer.diskStorage({
		destination:(req,file,cb)=>cb(null,'uploads'),
		filename:(req,file,cb)=>cb(null,file.originalname+'-'+Date.now())
	})
})

try{
	fs.readdirSync('uploads');
}catch (error){
	console.log('uploads 폴더 생성');
	fs.mkdirSync('uploads');
}


// Router 설정
const authRouter = require('./routes/auth');
const storyRouter = require('./routes/story');

// sequelize MariaDB 연결
models.sequelize.sync()
.then(() => {
	console.log('✓ DB 연결 성공');
})
.catch(err => {
	console.error(err);
	console.log('✗ DB 연결 에러');
	process.exit();
});


// Router 사용
app.use('/auth',authRouter);
app.use('/story', storyRouter);

// 404 처리
app.use((req,res)=>{
	new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

app.listen(process.env.PORT,()=> console.log(`${process.env.PORT} port is listening...`));


