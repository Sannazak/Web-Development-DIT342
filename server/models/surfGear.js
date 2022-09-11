var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfGearsSchema = new Schema({
    id: String,
    name: String,
    price: Number,
    size: Number,
    gender: String,
    description: String
});

module.exports = mongoose.model('surfGears', surfGearsSchema); 