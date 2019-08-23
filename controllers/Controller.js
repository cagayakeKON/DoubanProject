var superagent = require("superagent");
require('superagent-proxy')(superagent);
var model = require('../models/model')


function mainPage(req, res) {
    res.render('index');
}


function module1(req,res){
    var country=req.params;
    console.log(country);
    res.send(req.params);


}


module.exports = {
    mainPage: mainPage,
    module1:module1
}