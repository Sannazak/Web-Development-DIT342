var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfSpotsSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, },
        description: { type: String },
        surfSpotTags: { type: [String] } ,
        location: {
            longitude: { type: Number },
            latitude: { type: Number }
        },
        adress: {
            country: { type: String, required: true },
            street: { type: String },
            streetNr: { type: Number },
            postalCode: { type: Number },
            city: { type: String, required: true }
        }
});

module.exports = mongoose.model('surfSpots', surfSpotsSchema);     