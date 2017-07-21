var TestSchema = new mongoose.Schema({
    date : { type:String },
    method  : { type:String },
    name : { type:String },
    averageRequestTime: { type:Number, default:0 }
},
 { collection : 'request' });

var Request = mongoose.model('Request',TestSchema);

var aggregator = Request.aggregate();
aggregator = aggregator.project({ _id: 0});
aggregator = aggregator.group({_id:"$date", data:{$push:"$$ROOT"}});
aggregator = aggregator.sort({"date":-1});
aggregator = aggregator.limit(5);
aggregator = aggregator.unwind("$data");
aggregator = aggregator.group({_id:{ method:"$data.method", name:"$data.name" },value:{$addToSet:"$data"}});
aggregator = aggregator.project({ "value.method": 0,"value.name":0});

aggregator.exec(function(err, result) {

    return result;

});

