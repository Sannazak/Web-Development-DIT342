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

module.exports = router;