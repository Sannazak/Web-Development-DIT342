var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfGearsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    size: { type: Number },
    gender: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('surfGears', surfGearsSchema); 