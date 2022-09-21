var express = require('express');
var router = express.Router();
var SurfBoards = require('../models/surfBoards');

//Create a new surf board
router.post('/api/surfBoards', function(req, res, next){
    var surfBoards = new SurfBoards(req.body);
    surfBoards.save(function(err, surfBoards){
        if(err) { return res.status(400); }
        res.status(201).json(surfBoards);
    });
});

//Get all the surf boards
router.get('/api/surfBoards', function(req, res, next){
    SurfBoards.find(function(err, surfBoards){
        if(err) { return res.status(400);}
        res.status(200).json(surfBoards);
    });
});

//Delete all the surf boards 
router.delete('/api/surfBoards', function(req, res, next){
    SurfBoards.deleteMany(function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surfboard not found'});
        }
        res.status(202).json(surfBoards);
    });
});

//Get a surf board by its ID
router.get('/api/surfBoards/:id', function(req, res, next){
    var id = req.params.id;
    SurfBoards.findById(id, function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surfboard not found'});
        }
        res.status(200).json(surfBoards);
    });
});

//Delete a surfboard by its ID
router.delete('/api/surfBoards/:id', function(req, res, next){
    var id = req.params.id;
    SurfBoards.findOneAndDelete({_id: id}, function(err, surfBoards){
        if(err) {return next(err);}
        if(surfBoards === null){
            return res.status(404).json({'message': 'Surfboard not found'});
        }
        res.status(202).json(surfBoards);
    });
});

router.put('/api/surfBoards/:id', function(req, res, next) {
    //TO DO: make the code shorter
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
        res.status(201).json(surfBoards);
    });
});

router.patch('/api/surfBoards/:id', function(req, res, next) {
    //TO DO: make the code shorter
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
        res.status(201).json(surfBoards);
    });
});

module.exports = router;