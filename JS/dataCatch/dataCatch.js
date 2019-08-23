var superagent = require("superagent");
var cheerIo = require('cheerio');
require('superagent-proxy')(superagent);
var model = require('../../models/model');
var url = "mongodb://localhost:27017/doubanDatabases"
var mongoClient = require('mongodb').MongoClient;





function saveAllData() {
    var i = 0;
    //var proxy = process.env.http_proxy || 'http://127.0.0.1:1080';
    catchData();

    function catchData() {
        var JsonData;
        var url = encodeURI(`https://movie.douban.com/j/new_search_subjects?tags=电影&start=${i*20}&year_range=2009,2019`);
        var movieOfAmericaUrl = encodeURI(`https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影&start=${i*20}&countries=中国大陆`)
        try {
            superagent.get(url).end(function (error, data) {
                if (error) throw error;
                JsonData = JSON.parse(data.text);
                for (let j in JsonData.data) //JsonData为一个JSON对象,里面的data部分才是数组
                {
                    model.saveAllData(JsonData.data[j]);
                }


                console.log("现在已经抓取到" + i * 20 + "   " + "现在长度" + JsonData.data.length);
                if (JsonData.data.length < 20) {
                    return;
                }
                catchDataCircle();
            });
        } catch (err) {
            console.log("现在已经抓取到" + i * 20 + " 本次抓取失败 " + "现在长度" + JsonData.data.length);
            catchDataCircle();
        }



    }

    function catchDataCircle() {
        i = i + 1;
        catchData();
    }


}


function saveCountryMovie(name_EN, name_CN) //抓取每个国家的电影,
{
    var i = 0;
    //var proxy = process.env.http_proxy || 'http://127.0.0.1:1080';


    function catchData() {
        var JsonData;
        var movieOfAmericaUrl = encodeURI(`https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影&start=${i*20}&countries=${name_CN}&year_range=2009,2019`)

        superagent.get(movieOfAmericaUrl).end(function (error, data) {
            if (error) throw error;
            JsonData = JSON.parse(data.text);
            for (let j in JsonData.data) //JsonData为一个JSON对象,里面的data部分才是数组
            {
                model.saveCountryData(JsonData.data[j], name_EN);
            }


            console.log("现在已经抓取到" + i * 20 + "   " + "现在长度" + JsonData.data.length);
            if (JsonData.data.length < 20) {
                return;
            }
            catchDataCircle();
        });





    }
    catchData();

    function catchDataCircle() {
        i = i + 1;
        catchData();
    }


}

//saveCountryMovie('china','中国大陆');
//saveAllData();//不分国家抓取
function addCountry() {
    var dataIndex=0;
    function getAllData(callback) {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error) throw err;
            var dbTmp = db.db("doubanDatabases");
            dbTmp.collection('main').find().toArray(function (err, result) {

                var catchInterval=setInterval(
                    function(){
                        var countryName;
                        var url = encodeURI(result[dataIndex].url);
                        superagent.get(url).end(function (err, data) {
                            if (err) throw err;
    
                            var $ = cheerIo.load(data.text);
                            var infoString = $('#info').text();
                            var countryIndex = infoString.indexOf("制片国家/地区");
                            var languageIndex = infoString.indexOf("语言");
                            countryName = infoString.substring(countryIndex+9, languageIndex).trim();
                            callback(result[dataIndex],countryName);
                            console.log("获取到了第"+dataIndex+"个数据");
                            if(dataIndex>9978)
                            {
                                clearInterval(catchInterval);
                            }
                            dataIndex++;
                            
    
                        });
                    },1000
                )
               /* for (let item of result) {

                    var countryName;
                    var url = encodeURI(item.url);
                    superagent.get(url).end(function (err, data) {
                        if (err) throw err;

                        var $ = cheerIo.load(data.text);
                        var infoString = $('#info').text();
                        var countryIndex = infoString.indexOf("制片国家/地区");
                        var languageIndex = infoString.indexOf("语言");
                        countryName = infoString.substring(countryIndex+9, languageIndex).trim();
                        callback(item,countryName);


                    });

                    
                }*/
            })
        })


    }

    function saveCountryData(object,countryName) {

        var tmp = {
            directors: object.directors,
            rate: object.rate,
            cover_x: object.cover_x,
            star: object.star,
            title: object.title,
            url: object.url,
            casts: object.casts,
            cover: object.cover,
            _id: object._id,
            cover_y: object.cover_y,
            country:countryName
        }

        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error) {
                console.log(链接数据库失败error)
            }

            var nowDb = db.db('doubanDatabases');
            try {
                nowDb.collection(countryName).insertOne(tmp, function (err, res) {
                    db.close();
                })
            } catch (error) {
                console.log(插入 + tmp + 数据失败 + err)
                db.close();

            }

        })
    }

    getAllData(saveCountryData);
}

addCountry()