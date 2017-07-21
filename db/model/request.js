var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    date : { type:String },
    method  : { type:String },
    name : { type:String },
    averageRequestTime: { type:Number, default:0 }
},
 { collection : 'request' });

var Request = mongoose.model('Request',TestSchema);

module.exports = Request;