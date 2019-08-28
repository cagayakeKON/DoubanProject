var myChart7 = echarts.init(document.getElementById('graph7'));

myChart7.showLoading()



$.ajax({
    url: `http://127.0.0.1:8000/module7`,
    success: function (result) {
        //data2=JSON.parse(result)

        renderGraph7(result);
    },
    async: true
});



function renderGraph7(data) {

    // option.series[0].data=data;  为什么

    //var data2Temp = JSON.parse(data2);
    var dataArray7 = JSON.parse(data)

    for (let i in dataArray7) {
        var rate = parseFloat(dataArray7[i].rate);
        switch (true) {
            case rate < 2 && rate >= 0:
                var dataClass = {
                    name: dataArray7[i].title,
                    value: dataArray7[i]._id
                }
                data2Temp7.children[0].children[0].children.push(dataClass);
                break;
            case rate < 3 && rate >= 2:
                var dataClass = {
                    name: dataArray7[i].title,
                    value: dataArray7[i]._id
                }
                data2Temp7.children[0].children[1].children.push(dataClass);
                break;
            case rate < 4 && rate >= 3:
                var dataClass = {
                    name: dataArray7[i].title,
                    value: dataArray7[i]._id
                }
                data2Temp7.children[0].children[2].children.push(dataClass);
                break;
            case rate < 5 && rate >= 4:
                var dataClass = {
                    name: dataArray7[i].title,
                    value: dataArray7[i]._id
                }
                data2Temp7.children[0].children[3].children.push(dataClass);
                break;
            default:
                break;
        }


    }

    myChart7.setOption(option7);



    myChart7.hideLoading();


}

var data2Temp7 = {
    "name": "电影名称",
    "children": [{
        "name": "按评分分类",
        "children": [{
                "name": "0-2分",
                "children": []
            },
            {
                "name": "2-3分",
                "children": []
            },
            {
                "name": "3-4分",
                "children": []
            },
            {
                "name": "4-5分",
                "children": []
            }
        ]
    }]

}


var option7 = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [{
        type: 'tree',

        data: [data2Temp7],

        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',

        symbolSize: 15,

        label: {
            normal: {
                position: 'top',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 15
            }
        },

        leaves: {
            label: {
                normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
    }]
}