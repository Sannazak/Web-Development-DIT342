var express = require('express');
const surfGear = require('../models/surfGear');
var router = express.Router();
var SurfGear = require('../models/surfGear');

router.post('/api/surfGears', function(req, res, next){
    var surfGear = new SurfGear(req.body);
    surfGear.save(function(err, surfGear){
        if(err) {return next(err); }
        res.status(201).json(surfGear);
    });
});

router.get('/api/surfGears', function(req, res, next){
    SurfGear.find(function(err, surfGears){
        if(err) {return next(err);}
        res.json({'surfGears': surfGears})
    });
});

router.delete('/api/surfGears', function(req, res, next){
    SurfGear.deleteMany(function(err, surfGears){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.json(surfGear);
    });
});

router.get('/api/surfGears/:id', function(req, res, next){
    var id = req.params.id;
    SurfGear.findById(id, function(err, surfGear){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.json(surfGear);
    });
});

router.delete('/api/surfGears/:id', function(req, res, next){
    var id = req.params.id;
    SurfGear.findOneAndDelete({_id: id}, function(err, surfGear){
        if(err) {return next(err);}
        if(surfGear === null){
            return res.status(404).json({'message': 'Surf Gear not found'});
        }
        res.json(surfGear);
    });
});

router.put('/api/surfGears/:id', function(req, res, next) {
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
        res.json(surfGear);
    });
});

router.patch('/api/surfGears/:id', function(req, res, next) {
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
        res.json(surfGear);
    });
});

module.exports = router;