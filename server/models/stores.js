var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        //adress: {
            //city: {type: String, required: true},
            //street: {type: String, required:true},
          //  number: Number,
          //  postalCode: Number,
       // },
    }

);  

module.exports = mongoose.model('stores', storeSchema);