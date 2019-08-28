var myChart4 = echarts.init(document.getElementById('graph4'));
    myChart4.showLoading();
$.ajax({
    url: `http://127.0.0.1:8000/module4`,
    success: function (result4) {
        
        renderGraph4(result4);
    },
    async: true
});

var count4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function renderGraph4(data4){

   var countryArray4=['美国', '英国', '日本', '法国', '中国香港', '德国','中国大陆','韩国','意大利','加拿大','中国台湾','奥大利亚','西班牙','瑞士','新西兰','巴西','泰国','南非','伊朗','爱尔兰','印度','波兰','丹麦','瑞典','捷克','冰岛','博茨瓦纳','西德','阿根廷','奥地利','比利时'];

   var countryJson4= JSON.parse(data4);
   
   
   for(let item of countryJson4)
   {
       for(let i in countryArray4)
       {
           if(item.country===countryArray4[i])
           {
               count4[i]++;
           }
       }
   }

   myChart4.hideLoading();
    myChart4.setOption(option4);
}







var dataAxis = ['美国', '英国', '日本', '法国', '香港', '德国','中国大陆','韩国','意大利','加拿大','台湾','奥大利亚','西班牙','瑞士','新西兰','巴西','泰国','南非','伊朗','爱尔兰','印度','波兰','丹麦','瑞典','捷克','冰岛','博茨瓦纳','西德','阿根廷','奥地利','比利时'];
var data = count4;
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

var  option4 = {
    title: {
        text: '10年间每个国家的电影数量',
        
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            
            textStyle: {
                color: '#000000',
                fontSize: 15
            },
            
            rotate: -90,
            
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 8;
myChart4.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart4.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});