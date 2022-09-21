var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfLessonsSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    instructor: { type: String }
});

module.exports = mongoose.model('surfLessons', surfLessonsSchema);