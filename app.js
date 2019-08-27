var express = require("express");
var controller = require('./controllers/Controller.js')

var app = express();
app.set("view engine","ejs");
app.use("/plugin",express.static("plugin"));
app.use("/JS",express.static("JS"));
app.use("/CSS",express.static("CSS"))
app.get("/",controller.mainPage);


//下面是七个数量分析的数据的路由,由于英语太长,所以以module1-7命名

app.get('/module1/:id',controller.module1);
app.get('/module2/:id',controller.module2);
app.get('/module7',controller.module7);
app.listen(8000,function(){
    console.log("服务器已启动");
})