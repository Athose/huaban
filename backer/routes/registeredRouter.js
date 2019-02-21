var express = require('express');
var router = express.Router();
var mongo = require("../0LinkMongoDB");
var session = require("express-session"); // 启动后端存储模块(可以暂时放用户信息)   
var crypto = require('crypto'); // 密码加密模块

//向后台储存用户信息------------------------------------
router.post('/info', function(req, res) {
	var mongo = require("../0LinkMongoDB");
	console.log(req.body)
	// 	      var MD5=crypto.createHash('md5')   //想把获得的密码加密好放进数据库
	// 	      var usepas=MD5.update(req.body.usepwd).digest('base64');
	//  这里开始存↓
	mongo("add", "user", {
		usename: req.body.usename,
		shopcar: JSON.stringify(req.body.shopcar)
	}, function(rs) {});
	res.send('{"success":"success"}');
});

//向后台查找用户信息------------------------------------
router.get('/fin', function(req, res) {
	var Jusename = JSON.parse(req.query.usename)
	// console.log(Jusename.usename)  	     	   
	mongo("find", "user", {
		usename: String(Jusename)
	}, function(re) {
		if (re.length == 0) {
			console.log(re)
			res.send('{"success":"success"}');
		} else {
			console.log(re[0].shopcar)
			res.send('{"error":"error","re":' + re[0].shopcar + '}');
		}
	})
});


//要使用后端存储session 必须构造一个函数↓
function User(x) {
	this.name = x.name;
	this.pasword = x.pasword;
}
//发送用户名登录------------------------------------
router.post('/uselogin', function(req, res) {
	console.log(req.body)
	//  把用户名存放到session中↓
	var userinfo = new User({
		name: req.body.usename
	})
	req.session.user = userinfo;
	console.log(req.session.user) //打印一下 session模块有没有存储了东西
	res.send("{'success':'登录成功'}"); //把此用户的信息返回给前端 	  

});

// 检测session里面是否有数据(有即登录，没就没登录)
router.get("/isLogin", function(req, res) {
	if (req.session.user) {
		if (req.session.user.name != "") {
			res.send(req.session.user.name)
		} else {
			res.send('{"error":"error"}')
		}
	} else {
		var userinfo = new User({
			name: ""
		})
		req.session.user = userinfo;
		res.send('{"error":"error"}')
	}
})

//  注销(清空session)
router.get("/offline", function(req, res) {
	var userinfo = new User({
		name: ""
	})
	req.session.user = userinfo;
	res.send('{"success":"注销成功"}')

})

//遍历购物车的数据库
router.get('/findcar', function(req, res) {
	console.log(req.query, 'findcar')
	mongo("find", "usergoods", {
		usename: req.query.usename,
		goodsid: req.query.goodsid
	}, function(re) {
		console.log(re)
		if (re.length == 0) {
			res.send('{"success":"success"}');
		} else {
			res.send('{"error":"error"}');
		}
	})
});




//存储用户 购物车的商品
// router.post('/addshopcar', function(req, res) {
// 	console.log(req.body, 'addshopcar')
// 	mongo("add", "usergoods", {
// 		usename: req.body.usename,
// 		goodsid: req.body.goodsid,
// 		desc: req.body.desc
// 	}, function(rs) {});
// 	res.send('{"success":"success"}');
// });

router.post('/addshopcar', function(req, res) {
	console.log(req.body.username)
	console.log(req.body.carGoods);
	mongo("update", "user", [{
		usename: req.body.username
	}, {
		shopcar: JSON.stringify(req.body.carGoods)
	}], function(re) {
		res.send(re);
	})
})




module.exports = router;
