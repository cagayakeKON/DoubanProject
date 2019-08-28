var myChart6 = echarts.init(document.getElementById('graph6'));

myChart6.showLoading()

$.ajax({
    url: `http://127.0.0.1:8000/module6`,
    success: function (result) {
        //data2=JSON.parse(result)

        renderGraph6(result);
    },
    async: true
});

function renderGraph6(data) {
    const bar1 = [];
    const bar2 = [];
    const bar3 = [];
    const bar4 = [];
    const bar5 = [];
    const bar6 = [];
    const bar7 = [];
    const bar8 = [];
    const bar9 = [];
    const bar10 = [];
    const bar11 = [];

    const dataArray = JSON.parse(data)
    for (let i in dataArray) {
        if (dataArray[i].country === '中国大陆') {
            var date = parseInt(dataArray[i].date);

            switch (date) {
                case 2009:
                    bar1.push(dataArray[i]);
                    break;

                case 2010:
                    bar2.push(dataArray[i]);
                    break;

                case 2011:
                    bar3.push(dataArray[i]);
                    break;

                case 2012:
                    bar4.push(dataArray[i]);
                    break;
                case 2013:
                    bar5.push(dataArray[i]);
                    break;
                case 2014:
                    bar6.push(dataArray[i]);
                    break;
                case 2015:
                    bar7.push(dataArray[i]);
                    break;
                case 2016:
                    bar8.push(dataArray[i]);
                    break;
                case 2017:
                    bar9.push(dataArray[i]);
                    break;
                case 2018:
                    bar10.push(dataArray[i]);
                    break;
                case 2019:
                    bar11.push(dataArray[i]);
                    break;

                default: {
                    break;
                }
            }
        }
    }
    option6.series[0].data[0].value = bar1.length;
    option6.series[0].data[1].value = bar2.length;
    option6.series[0].data[2].value = bar3.length;
    option6.series[0].data[3].value = bar4.length;
    option6.series[0].data[4].value = bar5.length;
    option6.series[0].data[5].value = bar6.length;
    option6.series[0].data[6].value = bar7.length;
    option6.series[0].data[7].value = bar8.length;
    option6.series[0].data[8].value = bar9.length;
    option6.series[0].data[9].value = bar10.length;
    option6.series[0].data[10].value = bar11.length;


    myChart6.setOption(option6);
    myChart6.hideLoading();
}







var option6 = {
    title: {
        text: '近十年中国电影年份分布图',
        subtext: '2009～2019',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年']
    },
    series: [{
        name: '数量',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
                value: '',
                name: '2009年'
            },
            {
                value: '',
                name: '2010年'
            },
            {
                value: '',
                name: '2011年'
            },
            {
                value: '',
                name: '2012年'
            },
            {
                value: '',
                name: '2013年'
            },
            {
                value: '',
                name: '2014年'
            },
            {
                value: '',
                name: '2015年'
            },
            {
                value: '',
                name: '2016年'
            },
            {
                value: '',
                name: '2017年'
            },
            {
                value: '',
                name: '2018年'
            },
            {
                value: '',
                name: '2019年'
            }
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}