var superagent = require("superagent");
require('superagent-proxy')(superagent);
var model = require('../../models/model');



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


function saveCountryMovie(name_EN,name_CN)//抓取每个国家的电影,
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
                    model.saveCountryData(JsonData.data[j],name_EN);
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
saveAllData();//不分国家抓取

