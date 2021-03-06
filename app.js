var express = require("express");
var controller = require('./controllers/Controller.js')

var app = express();
app.set("view engine","ejs");
app.use("/plugin",express.static("plugin"));
app.use("/JS",express.static("JS"));
app.use("/CSS",express.static("CSS"))
app.get("/",controller.mainPage);

//解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
   
    next();
});



//下面是七个数量分析的数据的路由,由于英语太长,所以以module1-7命名

app.get('/module1/:id',controller.module1);
app.get('/module2/:id',controller.module2);
app.get('/module7',controller.module7);
app.get('/module4',controller.module4);
app.get('/module3',controller.module3);
app.get('/module5',controller.module5);
app.get('/module6',controller.module6);

app.listen(8000,function(){
    console.log("服务器已启动");
})