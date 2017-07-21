var express = require('express');
var router = express.Router();
var Request = require('../db/model/request');

router.get('/', function(req, res, next) {
    var aggregator = Request.aggregate();
    aggregator = aggregator.project({ _id: 0});
    aggregator = aggregator.group({_id:"$date", data:{$push:"$$ROOT"}});
    aggregator = aggregator.sort({"date":-1});
    aggregator = aggregator.limit(5);
    aggregator = aggregator.unwind("$data");
    aggregator = aggregator.group({_id:{ method:"$data.method", name:"$data.name" },value:{$addToSet:"$data"}});
    aggregator = aggregator.project({ "value.method": 0,"value.name":0});

    aggregator.exec(function(err, result) {
        res.send(result);
    });
});

module.exports = router;