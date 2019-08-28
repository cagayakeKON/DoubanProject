var superagent = require("superagent");
require('superagent-proxy')(superagent);
var model = require('../models/model')


function mainPage(req, res) {
    res.render('index');
}



function module2(req, res) {
    var country = req.params;

    switch (country.id) {
        case 'China':
            var countryName = '中国大陆';
            break;
        case 'America':
            var countryName = '美国';
            break;
        case 'Taiwan':
            var countryName = '中国台湾';
            break;
        case 'China':
            var countryName = '中国';
            break;
        case 'Japan':
            var countryName = '日本';
            break;
        case 'Korea':
            var countryName = '韩国';
            break;
        case 'England':
            var countryName = '英国';
            break;
        case 'France':
            var countryName = '法国';
            break;
        case 'Germany':
            var countryName = '德国';
            break;
        case 'Italy':
            var countryName = '意大利';
            break;
        case 'Spain':
            var countryName = '西班牙';
            break;
        case 'India':
            var countryName = '印度';
            break;
        case 'Thailand':
            var countryName = '泰国';
            break;
        case 'Russia':
            var countryName = '俄罗斯';
            break;
        case 'Iran':
            var countryName = '伊朗';
            break;
        case 'Canada':
            var countryName = '加拿大';
            break;
        case 'Australia':
            var countryName = '澳达伊亚';
            break;
        case 'Ireland':
            var countryName = '英格兰';
            break;
        case 'Sweden':
            var countryName = '瑞典';
            break;
        case 'Brazil':
            var countryName = '巴西';
            break;
        case 'Denmark':
            var countryName = '丹麦';
            break;
        default:
             var countryName = '中国大陆';

    }
    model.findCountryData(countryName, function (data) {
        res.write(JSON.stringify(data));
        res.end("");
    })


}

function module1(req, res) {
    var country = req.params;

    switch (country.id) {
        case 'China':
            var countryName = '中国大陆';
            break;
        case 'America':
            var countryName = '美国';
            break;
        case 'Taiwan':
            var countryName = '中国台湾';
            break;
        case 'China':
            var countryName = '中国';
            break;
        case 'Japan':
            var countryName = '日本';
            break;
        case 'Korea':
            var countryName = '韩国';
            break;
        case 'England':
            var countryName = '英国';
            break;
        case 'France':
            var countryName = '法国';
            break;
        case 'Germany':
            var countryName = '德国';
            break;
        case 'Italy':
            var countryName = '意大利';
            break;
        case 'Spain':
            var countryName = '西班牙';
            break;
        case 'India':
            var countryName = '印度';
            break;
        case 'Thailand':
            var countryName = '泰国';
            break;
        case 'Russia':
            var countryName = '俄罗斯';
            break;
        case 'Iran':
            var countryName = '伊朗';
            break;
        case 'Canada':
            var countryName = '加拿大';
            break;
        case 'Australia':
            var countryName = '澳达伊亚';
            break;
        case 'Ireland':
            var countryName = '英格兰';
            break;
        case 'Sweden':
            var countryName = '瑞典';
            break;
        case 'Brazil':
            var countryName = '巴西';
            break;
        case 'Denmark':
            var countryName = '丹麦';
            break;
        default:
             var countryName = '中国';

    }
    model.findCountryData(countryName, function (data) {
        res.write(JSON.stringify(data));
        res.end("");
    })


}

function module4(req,res){
    model.findAllData(function(data){
        res.write(JSON.stringify(data));
        res.end("");
    })
}
function module7(req,res){
    model.module7FindChinaRateLess5MovieName(function(data){
        res.write(JSON.stringify(data));
        res.end("");
    })

}
function module3(req, res) {
    model.findAllData(function (data) {
        res.write(JSON.stringify(data));
        res.end("");
    })
}

function module5(req, res) {
    model.findCountryData('中国大陆',function (data) {
        res.write(JSON.stringify(data));
        res.end("");
    })
}
function module6(req, res) {
    model.findAllData(function (data) {
        res.write(JSON.stringify(data));
        res.end("");
    })
}
module.exports = {
    mainPage: mainPage,
    module1: module1,
    module2: module2,
    module7:module7,
    module4:module4,
    module3: module3,
    module5: module5,
    module6:module6

}