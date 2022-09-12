var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfGearsSchema = new Schema({
    _id: { type: String, required: true, unique:true},
    name: String,
    price: Number,
    size: Number,
    gender: String,
    description: String
});

module.exports = mongoose.model('surfGears', surfGearsSchema); 