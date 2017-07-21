function ReportChart(){

    var createChart = function(){
        $.get('/report', function(data, error){
            renderChart(data);
        })
    };
 

    var renderChart = function(data){

        var xAxis = null;
        var maxLengh = 0;
        data.forEach(function(d){
            if(maxLengh < d.value.length){
                maxLengh = d.value.length;
                xAxis = d.value.map(function(v){
                    return v.date;
                });
            };

        });

        var series = data.map(function(o){
            return {
                name: o._id.method + '-' + o._id.name,
                data: o.value.map(function(r){
                    return {
                        y: r.averageResponseTime
                    }
                })
            }
        });

        var chart = new Highcharts.Chart({
            chart:{
                renderTo:'chart-container',
            },
            title:{
                text:'load test report'
            },
            xAxis:{
                categories:xAxis
            },
            yAxis:{
                title:{
                    text:'response time'
                },
            },
            series:series
        });
    }

    return {
        createChart: createChart
    }
}

const reportChart = new ReportChart();
reportChart.createChart()