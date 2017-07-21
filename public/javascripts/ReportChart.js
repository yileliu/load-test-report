function ReportChart(){

    var createChart = function(){
        $.get('/report', function(data, error){
            renderChart(data);
        })
    };
 

    var renderChart = function(data){
        var xAxis = data[0].map(function(o) {
            return o.date;
        });
 
        var series = data.map(function(o){
            return {
                name: o._id.method + '-' + o._id.name,
                data: o.values.map(function(r){
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
                    text:'method&name'
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