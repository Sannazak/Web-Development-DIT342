var express = require('express');
const surfBoards = require('../models/surfBoards');
var router = express.Router();
var SurfBoards = require('../models/surfBoards');

router.post('/api/surfBoards', function(req, res, next){
    var surfBoards = new SurfBoards(req.body);
    surfBoards.save(function(err, surfBoards){
        if(err) {return next(err); }
        res.status(201).json(surfBoards);
    });
});

router.get('/api/surfBoards', function(req, res, next){
    SurfBoards.find(function(err, surfBoards){
        if(err) {return next(err);}
        res.json({'surfBoards': surfBoards})
    });
});

router.delete('/api/surfBoards', function(req, res, next){
    SurfBoards.deleteMany(function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surf Board not found'});
        }
        res.json(surfBoards);
    });
});

router.get('/api/surfBoards/:id', function(req, res, next){
    var id = req.params.id;
    SurfBoards.findById(id, function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surf Board not found'});
        }
        res.json(surfBoards);
    });
});

router.delete('/api/surfBoards/:id', function(req, res, next){
    var id = req.params.id;
    SurfBoards.findOneAndDelete({_id: id}, function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surf Board not found'});
        }
        res.json(surfBoards);
    });
});

router.put('/api/surfBoards/:id', function(req, res, next) {
    var id = req.params.id;
    SurfBoards.findById(id, function(err, surfBoards) {
        if (err) { return next(err); }
        if (surfBoards == null) {
            return res.status(404).json({"message": "Surf Board not found"});
        }
        
        surfBoards.price = req.body.price;
        surfBoards.size = req.body.size;
        surfBoards.volume = req.body.volume;
        surfBoards.style = req.body.style;
        surfBoards.save();
        res.json(surfBoards);
    });
});

router.patch('/api/surfBoards/:id', function(req, res, next) {
    var id = req.params.id;
    SurfBoards.findById(id, function(err, surfBoards) {
        if (err) { return next(err); }
        if (surfBoards == null) {
            return res.status(404).json({"message": "Surf Board not found"});
        }
        surfBoards.price = (req.body.price || surfBoards.price);
        surfBoards.size = (req.body.size || surfBoards.size);
        surfBoards.volume = (req.body.volume || surfBoards.volume);
        surfBoards.style = (req.body.style || surfBoards.style);
        surfBoards.save();
        res.json(surfBoards);
    });
});

module.exports = router;