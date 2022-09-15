var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        adress: {
            country: { type: String, required: true },
            street: { type: String },
            streetNr: { type: Number },
            postalCode: { type: Number },
            city: { type: String, required: true }
        },

        surfLessons: [{type: Schema.Types.ObjectId, ref: "surfLessons"}]
       
    }

);  

module.exports = mongoose.model("stores", storeSchema);