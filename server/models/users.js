var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    password: { type: String, required: true },
    skillLevel: { type: String },
    boardPreference: { type: [String] },
    clothingSize: { type: String },
    userHeight: { type: Number },
    userWeight: { type: Number },
    favouriteStores : [{type: Schema.Types.ObjectId, ref: "stores"}],
    favouriteSpots : [{type: Schema.Types.ObjectId, ref: "surfSpot"}],
});
 
module.exports = mongoose.model("users", userSchema);

