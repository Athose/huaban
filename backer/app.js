var mongo=require("mongodb")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session=require("express-session");                     //后端存储模块(可以暂时放用户信息)          

var registeredRouter = require('./routes/registeredRouter');   //注册接口

var app = express();
var bodyParser=require("body-parser");                             //解析post参数的模块

//  session配置格式-------------------------------------------------------------------------
app.use(session({
	    name:'tianmao',                    // 名字(随便起)
	    secret:'tianmao',                   //对应的秘钥
	    cookie:{
	    	maxAge:80000000000      //储存字节
	    },
	    resave:false,                          //每次请求是否重新设置session
//	指每次请求重新设置 session cookie ,假如你设置的 cookie有效 10分钟    
	    saveUninitialized:false //每次请求是否初始化session	    
}))
//-------------------------------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/registeredRouter', registeredRouter);

module.exports = app;
