var express = require('express');
const surfSpot = require('../models/surfSpot');
var router = express.Router();
var SurfSpot = require('../models/surfSpot');

//add/post a spot
router.post('/api/surfSpots', function(req, res, next){
    var surfSpot = new SurfSpot(req.body);
    surfSpot.save(function(err, surfSpot){
        if(err) {return next(err); }
        res.status(201).json(surfSpot);
    });
});

//get all spots
router.get('/api/surfSpots', function(req, res, next){
    SurfSpot.find(function(err, surfSpots){
        if(err) {return next(err);}
        res.json({'surfSpots': surfSpots})
    });
});

//delete all spots
router.delete('/api/surfSpots', function(req, res, next){
    SurfSpot.deleteMany(function(err, surfSpots){
        if(err) {return next(err);}
        if(surfSpot === null){
            return res.status(404).json({'message': 'There are not spots'});
        }
        res.json(surfSpot);
    });
});

//get spot by id
router.get('/api/surfSpots/:id', function(req, res, next){
    var id = req.params.id;
    SurfSpot.findById(id, function(err, surfSpot){
        if(err) {return next(err);}
        if(surfSpot === null){
            return res.status(404).json({'message': 'Surf Spot not found'});
        }
        res.json(surfSpot);
    });
});

//delete spot by id
router.delete('/api/surfSpots/:id', function(req, res, next){
    var id = req.params.id;
    SurfSpot.findOneAndDelete({_id: id}, function(err, surfSpot){
        if(err) {return next(err);}
        if(surfSpot === null){
            return res.status(404).json({'message': 'Surf Spot not found'});
        }
        res.json(surfSpot);
    });
});

//put spot by id
router.put('/api/surfSpots/:id', function(req, res, next) {
    var id = req.params.id;
    SurfSpot.findById(id, function(err, surfSpot) {
        if (err) { return next(err); }
        if (surfSpot == null) {
            return res.status(404).json({"message": "Surf Spot not found"});
        }
        surfSpot.name = req.body.name;
        surfSpot.description = req.body.description;
        surfSpot.surfSpotTags = req.body.surfSpotTags;
        surfSpot.location = req.body.location;
        surfSpot.latitude = req.body.latitude;
        surfSpot.longitude = req.body.longitude;
        surfSpot.adress = req.body.adress;
        surfSpot.country = req.body.country;
        surfSpot.street = req.body.street;
        surfSpot.streetNr = req.body.streetNr;
        surfSpot.postalCode = req.body.postalCode;
        surfSpot.city = req.body.city;
        surfSpot.save();
        res.json(surfSpot);
    });
});

//patch spot by id
router.patch('/api/surfSpots/:id', function(req, res, next) {
    var id = req.params.id;
    SurfSpot.findById(id, function(err, surfSpot) {
        if (err) { return next(err); }
        if (surfSpot == null) {
            return res.status(404).json({"message": "Surf Spot not found"});
        }
        surfSpot.name = (req.body.name || surfSpot.name);
        surfSpot.description = (req.body.description || surfSpot.description);
        surfSpot.surfSpotTags = (req.body.surfSpotTags || surfSpot.surfSpotTags);
        surfSpot.location = (req.body.location || surfSpot.location);
        surfSpot.latitude = (req.body.latitude || surfSpot.latitude);
        surfSpot.longitude = (req.body.longitude || surfSpot.longitude);
        surfSpot.adress = (req.body.adress || surfSpot.adress);
        surfSpot.country = (req.body.country || surfSpot.country);
        surfSpot.street = (req.body.street || surfSpot.street);
        surfSpot.streetNr = (req.body.streetNr || surfSpot.streetNr);
        surfSpot.postalCode = (req.body.postalCode || surfSpot.postalCode);
        surfSpot.city = (req.body.city || surfSpot.city);
        surfSpot.save();
        res.json(surfSpot);
    });
});


module.exports = router;