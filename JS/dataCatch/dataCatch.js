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
    var dataIndex = 9900;

    function getAllData(callback) {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error) throw error;
            var dbTmp = db.db("doubanDatabases");
            dbTmp.collection('main').find().toArray(function (err, result) {

                var catchInterval = setInterval(
                    function () {
                        var countryName;

                        function getUrl(callback) {
                            var url = encodeURI(result[dataIndex].url);
                            dataIndex_copy = dataIndex
                            callback(url, dataIndex_copy)
                            dataIndex++;
                        }


                        getUrl(getCountryName);

                        function getCountryName(url, dataIndex_copy) {
                            try {
                                superagent.get(url).end(function (err, data) {


                                    var $ = cheerIo.load(data.text);
                                    var infoString = $('#info').text();
                                    var countryIndex = infoString.indexOf("制片国家/地区");
                                    var languageIndex = infoString.indexOf("语言");
                                    countryName = infoString.substring(countryIndex + 9, languageIndex).trim();
                                    if (countryName.indexOf('/') > -1) {
                                        var countryNameArray = countryName.split('/')
                                        for (let item of countryNameArray) {
                                            callback(result[dataIndex_copy], (item.trim()));
                                            console.log("获取到了第" + dataIndex_copy + "个数据" + "此数据的国家个数为" + countryNameArray.length);
                                        }
                                    } else {
                                        callback(result[dataIndex_copy], countryName);
                                        console.log("获取到了第" + dataIndex_copy + "个数据");
                                    }



                                    if (dataIndex_copy > 9977) {
                                        clearInterval(catchInterval);
                                    }



                                });
                            } catch (error) {
                                console.log(error)
                            }

                        }


                    }, 500
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

    function saveCountryData(object, countryName) {

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
            country: countryName
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
                console.log('插入' + tmp + "数据失败" + error)
                db.close();

            }

        })
    }

    getAllData(saveCountryData);
}



function addCountryAndDates() {
    var dataIndex = 9900;

    function getAllData(callback) {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error) throw err;
            var dbTmp = db.db("doubanDatabases");
            dbTmp.collection('main').find().toArray(function (err, result) {

                var catchInterval = setInterval(
                    function () {
                        var countryName;


                        function getUrl(callback) {
                            var url = encodeURI(result[dataIndex].url);
                            dataIndex_copy = dataIndex
                            callback(url, dataIndex_copy)
                            dataIndex++;
                        }


                        getUrl(getCountryName);

                        function getCountryName(url, dataIndex_copy) {
                            try {
                                superagent.get(url).end(function (err, data) {

                                    try {
                                        var $ = cheerIo.load(data.text); 
                                        var infoString = $('#info').text();
                                    } catch (error) {
                                        console.log(error);
                                        infoString=null;
                                    }
                                    if(infoString===null)
                                    {
                                        return;
                                    }
                                 
                                   
                                    var countryIndex = infoString.indexOf("制片国家/地区");
                                    var languageIndex = infoString.indexOf("语言");
                                    var datesIndex = infoString.indexOf("上映日期");
                                    if (languageIndex != -1) {
                                        countryName = infoString.substring(countryIndex + 9, languageIndex).trim();
                                    } else {
                                        countryName = infoString.substring(countryIndex + 9, datesIndex).trim();
                                    }

                                    var rel = /^\d{4}-\d{1,2}-\d{1,2}/;
                                    var dateString = infoString.substr(datesIndex + 6, 15);
                                    if (rel.exec(dateString) !== null) {
                                        var dateTmp = (rel.exec(dateString)[0]);
                                    } else {
                                        var dateTmp = '此数据没有找到日期信息';

                                    }

                                    callback(result[dataIndex_copy], countryName, dateTmp);
                                    console.log("获取到了第" + dataIndex_copy + "个数据" + "此数据的日期为" + dateTmp);

                                    if (dataIndex_copy > 9976) {
                                        clearInterval(catchInterval);
                                    }



                                });
                            } catch (error) {
                                console.log(error)
                            }

                        }


                    }, 500
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

    function saveCountryData(object, countryName, dateTmp) {

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
            country: countryName,
            date: dateTmp
        }

        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error) {
                console.log(链接数据库失败error)
            }

            var nowDb = db.db('doubanDatabases');
            try {
                nowDb.collection('main2').insertOne(tmp, function (err, res) {
                    db.close();
                })
            } catch (error) {
                console.log('插入' + tmp + "数据失败" + error)
                db.close();

            }

        })
    }

    getAllData(saveCountryData);
}

addCountryAndDates();