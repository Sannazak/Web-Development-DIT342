var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfSpotsSchema = new Schema({
    name: String,
    description: String,
    surfSpotTags: [String],
    location: {
        longitude: Number,
        latitude: Number
    },
    adress: {
        country: String ,
        street: String ,
        streetNr: Number ,
        postalCode: Number ,
        city: String 
    }
});

module.exports = mongoose.model('surfSpots', surfSpotsSchema);     