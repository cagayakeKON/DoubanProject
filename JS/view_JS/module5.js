var myChart5 = echarts.init(document.getElementById('graph5'));

myChart5.showLoading()

$.ajax({
    url: `http://127.0.0.1:8000/module6`,
    success: function (result) {
        //data2=JSON.parse(result)

        renderGraph5(result);
    },
    async: true
});

function renderGraph5(data) {
    const bar1 = [];
    const bar2 = [];
    const bar3 = [];
    const bar4 = [];

    const dataArray = JSON.parse(data)
    for (let i in dataArray) {
        rate = parseFloat(dataArray[i].rate);
        //console.log(date);
        switch (true) {
            case rate >= 0 && rate < 3:
                bar1.push(dataArray[i]);
                break;

            case rate >= 3 && rate < 5:
                bar2.push(dataArray[i]);
                break;

            case rate >= 5 && rate < 7:
                bar3.push(dataArray[i]);
                break;

            case rate >= 7 && rate <= 10:
                bar4.push(dataArray[i]);
                break;


            default: {
                break;
            }
        }
    }

    
    option5.series[0].data[0].value=bar1.length;
    option5.series[0].data[1].value=bar2.length;
    option5.series[0].data[2].value=bar3.length;
    option5.series[0].data[3].value=bar4.length;

    myChart5.setOption(option5);
    myChart5.hideLoading();
}




var option5 = {
    title : {
        text: '近十年电影评分分布图',
        subtext: '2009～2019',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['0～3分','3～5分','5～7分','7～10分']
    },
    series : [
        {
            name: '数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:'', name:'0～3分'},
                {value:'', name:'3～5分'},
                {value:'', name:'5～7分'},
                {value:'', name:'7～10分'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}