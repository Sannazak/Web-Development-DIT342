var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfBoardsSchema = new Schema({
    id: {type: Number},
    volume: { type: String },
    price: { type: Number },
    size: { type: Number },
    style: { type: String}
    
});

module.exports = mongoose.model('surfBoards', surfBoardsSchema); 