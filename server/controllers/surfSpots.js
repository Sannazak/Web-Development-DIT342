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
        res.status(200).json({'surfSpots': surfSpots})
    });
});

//delete all spots
router.delete('/api/surfSpots', function(req, res, next){
    SurfSpot.deleteMany(function(err, surfSpots){
        if(err) {return next(err);}
        if(surfSpot === null){
            return res.status(404).json({'message': 'There are not spots'});
        }
        res.status(202).json(surfSpot);
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
        res.status(200).json(surfSpot);
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
        res.status(202).json(surfSpot);
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
        res.status(200).json(surfSpot);
    });
});

//patch spot by id
router.patch('/api/surfSpots/:id', function(req, res, next) {
    var id = req.params.id;
    SurfSpot.findByIdAndUpdate(id, req.body,{new: true}, function(err, surfSpot) {
        if (err) {
            return next(err); 
        } else if (surfSpot === null) {
            return res.status(404).json({'message': 'Surf spot not found!'});   
        } else {
            return res.status(200).json(surfSpot);
        }
    })
});

//get spot with certain tag
router.get('/api/surfSpots?surfSpotTags=:tag', function(req, res, next) {
    console.log("Searching through spots");
    SurfSpot.find({surfSpotTags: {$all : [req.params.tag] } }).exec(function (err, surfSpot) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Search complete");
        return res.status(200).json(surfSpot);
    });
});

//get spot with certain country location
router.get('/api/surfSpots?Country=:country', function(req, res, next) {
    console.log("Searching through spots");
    SurfSpot.find({surfSpotTags: {$all : [req.params.country] } }).exec(function (err, surfSpot) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Search complete");
        return res.status(200).json(surfSpot);
    });
});

module.exports = router;