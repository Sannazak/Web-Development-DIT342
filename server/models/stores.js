var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
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

// //post favouriteStore to user
// //check if duplicate
// router.post('/api/users/:id/favouriteStores', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) { return res.status(400); }
//         if (user === null) {
//             return res.status(404).json({ 'message': 'User not found' });
//         } else {

//             let favouriteStore = new FavouriteStore(req.body);
//             favouriteStore.save(function(err) {
//                 if(err) {
//                     return res.status(400);
//                 }
//             })

//            if (user.favouriteStores.find(e => e == favouriteStore)){
//             return res.status(400)('Store already exist');
//            } else {
//             user.favouriteStores.push(favouriteStore);
//             user.save();
//             return res.status(201).json(user);
//            }
//         }
//     })
// });