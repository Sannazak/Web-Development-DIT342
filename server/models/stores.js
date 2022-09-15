var mongoose = require('mongoose');
const surfGear = require('./surfGear');
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
        surfLessons: [{type: Schema.Types.ObjectId, ref: "surfLessons"}],
        surfGear: [{ type: Schema.Types.ObjectId, ref: "surfGears" }]
    }

);  

module.exports = mongoose.model("stores", storeSchema);