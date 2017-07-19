function ReportChart(){
    var getChartData = function(){
        $.get('/report', function(data, error){
            console.log(data);
        })
    };

    var creatChart = function(){
        getChartData();
        console.log('createChart');
    }

    creatChart();
}

ReportChart();