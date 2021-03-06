var url = "mongodb://localhost:27017/doubanDatabases"
var mongoClient = require('mongodb').MongoClient;



//前面两个个为获取数据的时候使用的函数
function saveAllData(object) {

    var tmp = {
        directors: object.directors,
        rate: object.rate,
        cover_x: object.cover_x,
        star: object.star,
        title: object.title,
        url: object.url,
        casts: object.casts,
        cover: object.cover,
        _id: parseInt(object.id),
        cover_y: object.cover_y
    }

    mongoClient.connect(url, {
        useNewUrlParser: true
    }, function (error, db) {
        if (error) {
            console.log("链接数据库失败error")
        }

        var nowDb = db.db('doubanDatabases');
        try {
            nowDb.collection('main').insertOne(tmp, function (err, res) {
                db.close();
            })
        } catch (error) {
            console.log(插入 + tmp + 数据失败 + err)
            db.close();

        }

    })



}

function saveCountryData(object, collectionName) {

    var tmp = {
        directors: object.directors,
        rate: parseFloat(object.rate),
        cover_x: parseInt(object.cover_x),
        star: parseInt(object.star),
        title: object.title,
        url: object.url,
        casts: object.casts,
        cover: object.cover,
        _id: parseInt(object.id),
        cover_y: parseInt(object.cover_y)
    }

    mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (error, db) {
        if (error) {
            console.log(链接数据库失败error)
        }

        var nowDb = db.db('doubanDatabases');
        try {
            nowDb.collection(collectionName).insertOne(tmp, function (err, res) {
                db.close();
            })
        } catch (error) {
            console.log(插入 + tmp + 数据失败 + err)
            db.close();

        }

    })



}

function findAllData(callback) {
    mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("doubanDatabases");
        dbo.collection('main2').find().toArray(function (err, result) {
            if (err) throw err;
            db.close();
            callback(result);

        });
    });
}

function findCountryData(countryName, callback) {


    mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("doubanDatabases");
        var re2 = new RegExp(countryName);
        var temClass={
            country:countryName
        }
        
        dbo.collection('main2').find(temClass).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            callback(result);

        });
    });
}

function module7FindChinaRateLess5MovieName(callback) {
    mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("doubanDatabases");
        dbo.collection('main2').find({
            'date': /2019/,
            "rate": /^[0-5].[0-9]*$/
        }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            callback(result);
        });
    });
}

module.exports = {
    saveAllData: saveAllData,
    saveCountryData: saveCountryData,
    findCountryData: findCountryData,
    module7FindChinaRateLess5MovieName: module7FindChinaRateLess5MovieName,
    findAllData:findAllData
   
}