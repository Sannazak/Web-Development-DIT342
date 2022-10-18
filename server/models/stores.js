var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String},
        phoneNumber: {type: String},
        openingHours: {type: String},
        email: {type: String},
        adress: {
            country: { type: String },
            street: { type: String },
            streetNr: { type: Number },
            postalCode: { type: Number },
            city: { type: String}
        },
        surfBoards: [{type: Schema.Types.ObjectId, ref: "surfBoards"}],
        surfLessons: [{type: Schema.Types.ObjectId, ref: "surfLessons"}],
        surfGears: [{type: Schema.Types.ObjectId, ref: "surfGears"}]
    }
);  

module.exports = mongoose.model("stores", storeSchema);
