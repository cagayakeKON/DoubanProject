function graphRender() {
	var myChart = echarts.init(document.getElementById('graph'));
	var myData;
	$('#module1ButtonSubmit').on('click', function () {
		var options = $("#module1CountrySelect option:selected");

		$.ajax({
			url: `http://127.0.0.1:8000/module1/${options.val()}`,
			success: function (result) {
				renderGraph(result);
			},
			async:true
		});

		/*	$.get(`http://127.0.0.1:8000/module1/${options.val()}`,function(data,status){
            alert("数据: " + data + "\n状态: " + status);
        });*/

	});

	//var rateInterval=['9.5-10.0','8.5-9.0','7.5-8.0','6.5-7.0','5.5-6.0','4.5-5.0','3.5-4.0','2.5-3.0','小于2.5']
	function renderGraph(result) {
		var bar1 = [];
		var bar2 = [];
		var bar3 = [];
		var bar4 = [];
		var bar5 = [];
		var bar6 = [];
		var bar7 = [];
		var bar8 = [];
		var bar9 = [];

		

		var JSONData = JSON.parse(result);
		for (let i in JSONData) {
			rate = parseFloat(JSONData[i].rate);
			switch (true) {
				case rate >= 9.5:
					bar1.push(JSONData[i]);
					break;
				case rate >= 8.5 && rate < 9.5:
					bar2.push(JSONData[i]);
					break;

				case rate >= 7.5 && rate < 8.5:
					bar3.push(JSONData[i]);
					break;
				case rate >= 6.5 && rate < 7.5:
					bar4.push(JSONData[i]);
					break;
				case rate >=5.5 && rate < 6.5:
					bar5.push(JSONData[i]);
					break;
				case rate >= 4.5 && rate < 5.5:
					bar6.push(JSONData[i]);
					break;
				case rate >= 3.5 && rate < 2.5:
					bar7.push(JSONData[i]);
					break;
				case rate >= 2.5 && rate < 3.5:
					bar8.push(JSONData[i]);
					break;
				case rate <2.5:
					bar9.push(JSONData[i]);
					break;
				default:{
					break;
				}
			}

			/*if(rate >= 9.5)
			{
				bar1.push(JSONData[i]);
			}
			else if(rate > 9.5 && rate <= 8.5){
				bar2.push(JSONData[i]);
			}
			
			else if(rate > 8.5 && rate <= 7.5){
				bar3.push(JSONData[i]);
			}
			else if((rate > .5 && rate <= 8.5){
				bar4.push(JSONData[i]);
			}
			else if((rate > .5 && rate <= 8.5){
				bar5.push(JSONData[i]);
			}
			else if((rate > 9.5 && rate <= 8.5){
				bar6.push(JSONData[i]);
			}
			else if((rate > 9.5 && rate <= 8.5){
				bar7.push(JSONData[i]);
			}
			else if((rate > 9.5 && rate <= 8.5){
				bar8.push(JSONData[i]);
			}
			else if((rate > 9.5 && rate <= 8.5){
				bar9.push(JSONData[i]);
			}*/

		}

		var count=[bar1.length,bar2.length,bar3.length,bar4.length,bar5.length,bar6.length,bar7.length,bar8.length,bar9.length]

		tempOptions.series[0].data=[];
		for(let item of count)
		{
			tempOptions.series[0].data.push(item);
		}


			myChart.setOption(tempOptions);


	}

	var tempOptions = {
		title: {
			text: '影评分和电影数量分析'
		},
		tooltip: {},
		legend: {
			data: ['数量']
		},
		xAxis: {
			data: ['9.5-10.0', '8.5-9.0', '7.5-8.0', '6.5-7.0', '5.5-6.0', '4.5-5.0', '3.5-4.0', '2.5-3.0', '小于2.5'],
			name: "评分",
			nameLocation: "end",

		},
		yAxis: {
			name: "数量",
			nameLocation: "end",
		},
		series: [{
				type: 'bar',
				data: []
			}

		]
		
			
		
			
		
	};

}
$(graphRender());
/*$.get("http://127.0.0.1:8000/module1_data", function (data) {
	console.log(data);
	renderReport(data);
})*/