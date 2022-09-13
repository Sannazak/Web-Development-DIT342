var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storesSchema = new Schema(
    {
        name: String//{type: String, required: true, unique: true},
        //adress: {
            //city: {type: String, required: true},
            //street: {type: String, required:true},
          //  number: Number,
          //  postalCode: Number,
       // },
    }

);  

module.exports = mongoose.model('stores', storesSchema);