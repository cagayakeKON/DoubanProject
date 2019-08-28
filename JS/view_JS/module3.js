var myChart3 = echarts.init(document.getElementById('graph3'));

myChart3.showLoading()



$.ajax({
    url: `http://127.0.0.1:8000/module3`,
    success: function (result) {
        //data2=JSON.parse(result)

        renderGraph3(result);
    },
    async: true
});

function renderGraph3(data) {
    var bar1 = [];
    var bar2 = [];
    var bar3 = [];
    var bar4 = [];
    var bar5 = [];
    var bar6 = [];
    var bar7 = [];
    var bar8 = [];
    var bar9 = [];
    var bar10 = [];
    var bar11 = [];
    var dataArray = JSON.parse(data)
    for (let i in dataArray) {
        date = parseInt(dataArray[i].date);
        //console.log(date);
        switch (true) {
            case date === 2009:
                bar1.push(dataArray[i]);
                break;

            case date === 2010:
                bar2.push(dataArray[i]);
                break;

            case date === 2011:
                bar3.push(dataArray[i]);
                break;

            case date === 2012:
                bar4.push(dataArray[i]);
                break;

            case date === 2013:
                bar5.push(dataArray[i]);
                break;

            case date === 2014:
                bar6.push(dataArray[i]);
                break;

            case date === 2015:
                bar7.push(dataArray[i]);
                break;

            case date === 2016:
                bar8.push(dataArray[i]);
                break;

            case date === 2017:
                bar9.push(dataArray[i]);
                break;

            case date === 2018:
                bar10.push(dataArray[i]);
                break;

            case date === 2019:
                bar11.push(dataArray[i]);
                break;

            default: {
                break;
            }
        }
    }
    var count = [bar1.length, bar2.length, bar3.length, bar4.length, bar5.length, bar6.length, bar7.length, bar8.length, bar9.length, bar10.length, bar11.length]
    option3.series[0].data = [];
    for (let item of count) {
        option3.series[0].data.push(item);
    }
    myChart3.setOption(option3);
    myChart3.hideLoading();
}




var option3 = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['数量']
    },
    grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        name: "年份",
        nameLocation: "end",
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value',
        name: "数量",
        nameLocation: "end",
    }],
    series: [{
        name: '数量',
        type: 'bar',
        data: []
    }]
}