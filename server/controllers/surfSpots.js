var express = require('express');
const surfSpot = require('../models/surfSpot');
var router = express.Router();
var SurfSpot = require('../models/surfSpot');

router.post('/api/surfSpots', function(req, res, next){
    var surfSpot = new SurfSpot(req.body);
    surfSpot.save(function(err, surfSpot){
        if(err) {return next(err); }
        res.status(201).json(surfSpot);
    });
});

router.get('/api/surfSpots', function(req, res, next){
    SurfSpot.find(function(err, surfSpots){
        if(err) {return next(err);}
        res.json({'surfSpots': surfSpots})
    });
});

router.delete('/api/surfSpots', function(req, res, next){
    SurfSpot.deleteMany(function(err, surfSpots){
        if(err) {return next(err);}
        if(surfSpot === null){
            return res.status(404).json({'message': 'Surf Spot not found'});
        }
        res.json(surfSpot);
    });
});

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


module.exports = router;