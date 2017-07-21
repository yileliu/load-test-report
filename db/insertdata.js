var mongodb = require('mongodb'); 
var lineReader = require('line-reader');
var server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true}); 
var db = new mongodb.Db('mydb', server);

db.open(function(err, db){
    if(!err){
        console.log('connect successful');

        db.createCollection('request',function(err,collection){
            if(err){
                console.log(err);
                }else{

                    lineReader.eachLine('requests_2017-06-20.csv', function(line, last) {
                       var methodJson = line.split(",")[0]; 
                       var nameJson = line.split(",")[1]; 
                       var requestNumberJson = Number(line.split(",")[2]); 
                       var faliureNumberJson = Number(line.split(",")[3]); 
                       var medianResponseTimeJson = Number(line.split(",")[4]); 
                       var averageResponseTimeJson = Number(line.split(",")[5]); 
                       var minResponseTimeJson = Number(line.split(",")[6]);
                       var maxResponseTimeJson = Number(line.split(",")[7]); 
                       var averageContentSizeJson = Number(line.split(",")[8]); 
                       var requestsPerSecJson = Number(line.split(",")[9]); 

                       var json = {date:"2017-06-20",
                                   method:methodJson,
                                   name:nameJson,
                                   requestNumber:requestNumberJson,
                                   faliureNumber:faliureNumberJson,
                                   medianResponseTime:medianResponseTimeJson,
                                   averageResponseTime:averageResponseTimeJson,
                                   minResponseTime:minResponseTimeJson,
                                   maxResponseTime:maxResponseTimeJson,
                                   averageContentSize:averageContentSizeJson,
                                   requestsPerSec:requestsPerSecJson};

                                   collection.insert(json,function(err,result){
                                       console.log(result);
                                });
                    })
                    }
        });
    }else{
        console.log(err);
        }
}); 