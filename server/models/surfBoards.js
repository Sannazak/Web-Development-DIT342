var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfBoardsSchema = new Schema({
    volume: { type: String },
    price: { type: Number },
    size: { type: String },
    style: { type: String , allowedValues: ["Shortboard", "Longboard", "Hybridboard", "Funboard", "Beginnerboard"] }
});

module.exports = mongoose.model('surfBoards', surfBoardsSchema); 