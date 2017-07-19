function ReportChart(){

    var createChart = function(){
        $.get('/report', function(data, error){
            renderChart(data);
        })
    };

    var renderChart = function(data){
        console.log(data);
    }

    return {
        createChart: createChart
    }
}

const reportChart = new ReportChart();
reportChart.createChart()