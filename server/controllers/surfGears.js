var express = require('express');
var router = express.Router();
var SurfGear = require('../models/surfGear');

//Create a new surf gear
router.post('/api/surfGears', function(req, res, next){
    //TO DO: make a check for the required attribute
    var surfGear = new SurfGear(req.body);
    surfGear.save(function(err, surfGear){
        if(err) {return next(err); }
        res.status(201).json(surfGear);
    });
});

//Get all the surf gears
router.get('/api/surfGears', function(req, res, next){
    SurfGear.find(function(err, surfGears){
        if(err) {return next(err);}
        res.status(200).json(surfGears);
    });
});

//Delete all the surf gears
router.delete('/api/surfGears', function(req, res, next){
    SurfGear.deleteMany(function(err, surfGear){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.status(202).json(surfGear);
    });
});

//Get a surf gear by it's ID
router.get('/api/surfGears/:id', function(req, res, next){
    var id = req.params.id;
    SurfGear.findById(id, function(err, surfGear){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.status(200).json(surfGear);
    });
});

//Delete a surf gear by its ID
router.delete('/api/surfGears/:id', function(req, res, next){
    var id = req.params.id;
    SurfGear.findOneAndDelete({_id: id}, function(err, surfGear){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.status(202).json(surfGear);
    });
});

router.put('/api/surfGears/:id', function(req, res, next) {
    //TO DO: make the code shorter
    var id = req.params.id;
    SurfGear.findById(id, function(err, surfGear) {
        if (err) { return next(err); }
        if (surfGear == null) {
            return res.status(404).json({"message": "Surf Gear not found"});
        }
        surfGear.name = req.body.name;
        surfGear.price = req.body.price;
        surfGear.size = req.body.size;
        surfGear.gender = req.body.gender;
        surfGear.description = req.body.description;
        surfGear.save();
        res.status(200).json(surfGear);
    });
});

router.patch('/api/surfGears/:id', function(req, res, next) {
    //TO DO: make the code shorter
    var id = req.params.id;
    SurfGear.findById(id, function(err, surfGear) {
        if (err) { return next(err); }
        if (surfGear == null) {
            return res.status(404).json({"message": "Surf Gear not found"});
        }
        surfGear.name = (req.body.name || surfGear.name);
        surfGear.price = (req.body.price || surfGear.price);
        surfGear.size = (req.body.size || surfGear.size);
        surfGear.gender = (req.body.gender || surfGear.gender);
        surfGear.description = (req.body.description || surfGear.description);
        surfGear.save();
        res.status(201).json(surfGear);
    });
});

module.exports = router;