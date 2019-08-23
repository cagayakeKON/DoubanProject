
 var myChart = echarts.init($("#v-pills-home")[0]);

 // 指定图表的配置项和数据
 var tempOptions = {
	 title: {
		 text: '武汉市近7天的温度变化趋势'
	 },
	 tooltip: {},
	 legend: {
		 data:['高温','低温']
	 },
	 xAxis: {
		 data: [],
		 name: "日期",
		 nameLocation: "end",
		 axisLabel:{
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


$.get("http://127.0.0.1:8000/module1", function(data){
        		console.log(data);
        		renderReport(data);
        	})