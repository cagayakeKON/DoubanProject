function graphRender() {
	var myChart = echarts.init(document.getElementById('graph'));

	$('#module1ButtonSubmit').on('click',function(){
		var options=$("#module1CountrySelect option:selected");

		$.get(`http://127.0.0.1:8000/module1/${options.val()}`,function(data){
			console.log(data)
		})
	});
	var tempOptions = {
		title: {
			text: '武汉市近7天的温度变化趋势'
		},
		tooltip: {},
		legend: {
			data: ['高温', '低温']
		},
		xAxis: {
			data: [],
			name: "日期",
			nameLocation: "end",
			axisLabel: {
				rotate: 45
			}
		},
		yAxis: {
			name: "温度(℃)",
			nameLocation: "end",
		},
		series: [{
				name: '高温',
				type: 'line',
				data: []
			},
			{
				name: '低温',
				type: 'line',
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