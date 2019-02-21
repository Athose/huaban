//   这是一个用于连接mongodb数据库的模块，使用之前要先安装: npm i mongodb
var mongo=require("mongodb")

//  把以下两句话直接复制↓
var MongoClient=mongo.MongoClient;         //mongodb的客户端
var url="mongodb://127.0.0.1:27017";     //服务器的地址

//--------让我们来创建一个新的库----------------------------------------------------------------
//var dbName="myqq";  //← 新创建的库名字
//
//MongoClient.connect(url,function(err,client){
//	if(err) throw err;
//	
//	var db=client.db(dbName);   // ←  client 代表需要连接到的数据库	
//	var collection=db.collection("user");  //  ←  需要操作数据库的集合（表），没有则自动创建
	
	//可以增删改查
	
//  1.写入/增加数据↓-------------------------------
//	collection.insertOne({name:"xiaoffo",age:"44"},function(err,result){
//		if(err) throw err;
//		console.log(result);
//		console.log("数据写入成功");
//	})

//  2.删除数据↓-------------------------------------
//	collection.deleteOne({name:"xiaoyyy"},function(err,result){
//		if(err) throw err;
//		console.log(result);
//		console.log("数据删除成功");
//	})
		
//  3.更改数据↓-------------------------------------
//	collection.updateOne({name:"xiaoppp"},{$set:{age:"54",level:"大学生"}},function(err,result){
//		if(err) throw err;
//		console.log(result);
//		console.log("数据修改成功");
//	})
		
//  4.查找数据↓-------------------------------------
//	collection.find({age:"44"}).toArray(function(err,result){
//		if(err) throw err;
//		console.log(result);
//		console.log("数据查找完毕");
//	})
		
//})


//-----------------------------------------------------------------------------------------------------------
//    把上面的方法都封装一下
     var dbName="JDWku";  //← 操作的库的名字，没有就会自动创建

//   假设我们要传入参数的模版→：mongo("add",   "user",   {name:"xiaoeee",age:88},  function(res){})
//                                                       操作类型(type)，操作的表(collections) ，操作内容(selector)， 回调函数(fn)  


//  1.首先写增加/写入数据的方法(注意传入的参数)----------------------
var add=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
		collection.insertOne(selector,function(err,result){
		if(err) throw err;
		fn(result);
		console.log("数据写入成功");
	})
}

//  2.接着写删除数据的方法(注意传入的参数)----------------------
var del=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
		collection.deleteOne(selector,function(err,result){
		if(err) throw err;
		fn(result);
		console.log("数据删除成功");
	})
}

//  3.接着写查找数据的方法(注意传入的参数)----------------------
var find=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
		collection.find(selector).toArray(function(err,result){
		if(err) throw err;
		fn(result);
		console.log("数据查找成功");
	})
}

//  4.接着写修改数据的方法(注意传入的参数)----------------------
//         ！！！这里的selector要传一个数组，【修改谁，修改后】
var update=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
	collection.updateOne(selector[0],{$set:selector[1]},function(err,result){
		if(err) throw err;
		fn(result);
		console.log("数据修改成功");
	})
}

//  5.首先写增加/写入多个数据的方法(注意传入的参数)----------------------
//         ！！！这里的selector要传一个数组，【增加项，增加项，增加项...】
var addMany=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
		collection.insertMany(selector,function(err,result){
		if(err) throw err;
		fn(result);
		console.log("多个数据写入成功");
	})
}

//  6.接着写删除多个数据的方法(注意传入的参数)----------------------
var delMany=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
		collection.deleteMany(selector,function(err,result){
		if(err) throw err;
		fn(result);
		console.log("多个数据删除成功");
	})
}

//  7.接着写修改多个数据的方法(注意传入的参数)----------------------
//         ！！！这里的selector要传一个数组，【修改谁，修改后】
var updateMany=function(client,collections,selector,fn){
	var db=client.db(dbName);  	                    // ←  每次用都要重新获取  client 这代表需要连接到的数据库          
	var collection=db.collection(collections);   //  ←  每次用都要重新获取需要操作数据库里面的集合（表），没有则自动创建
	collection.updateMany(selector[0],{$set:selector[1]},function(err,result){
		if(err) throw err;
		fn(result);
		console.log("多个数据修改成功");
	})
}
//------------------------------------
//因为下面暴露函数中type的类型不能直接作用于函数名字（“add”()，“find”()），因此需要写一个能用名字的对象
var methodtype={
	add:add,
	del:del,
	find:find,
	update:update,
	addMany:addMany,
	delMany:delMany,
	updateMany:updateMany
}

//   最后！！！！！！！暴露函数↓
module.exports=function(type,collections,selector,fn){
	   MongoClient.connect(url,function(err,client){	    	
	        	methodtype[type](client,collections,selector,fn);     //← methodtype[type]()==add()	   	 
	   })
}



//使用手册：

//// 增加一个
//mongo("add","user",{name:"xiaoeee",age:88},function(res){
//	console.log(res)
//})
//
//
////删除一个
//mongo("del","user",{name:"xiaoeee"},function(res){
//	console.log(res)
//})
//
////查找（多个）
//mongo("find","user",{age:"44"},function(res){
//	console.log(res)
//})

////修改一个
//mongo("update","user",[{age:"44"},{level:"大学生"}],function(res){
//	console.log(res)
//})

//// 增加多个
//mongo("addMany","user",[{name:"rttt",age:18},{name:"zawd",age:18},{name:"uyuii",age:18}],function(res){
//	console.log(res)
//})

//// 删除多个
//mongo("delMany","user",{age:"44"},function(res){
//	console.log(res)
//})

//// 修改多个
//mongo("updateMany","user",[{age:18},{level:"中学生"}],function(res){
//	console.log(res)
//})

