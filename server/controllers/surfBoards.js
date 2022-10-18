var express = require('express');
var router = express.Router();
var SurfBoards = require('../models/surfBoards');

//Create a new surf board
router.post('/api/surfBoards', function(req, res, next){
    var surfBoards = new SurfBoards(req.body);
    surfBoards.save(function(err, surfBoards){
        if(err) { return next(err); }
        res.status(201).json(surfBoards);
    });
});

//Get all the surf boards
router.get('/api/surfBoards', function(req, res, next){
    try{
        var query = SurfBoards.find();
        for (var queryName in req.query){
            if(req.query.hasOwnProperty(queryName)){
                if(req.query[queryName]){
                    query.where(queryName).equals(req.query[queryName]);
                }
            }
        }
        query.exec(function(err, surfboards){
            if(err) { return next(err); }
            res.status(200).json(surfboards)
        });
    }catch(error){
        res.status(404).json()
    };
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

router.patch('/api/surfBoards/:id', function(req, res, next) {
    var id = req.params.id;
    SurfBoards.findByIdAndUpdate(id, req.body, {new: true}, function(err, surfBoards) {
        if (err) {
            return next(err); 
        } else if (surfBoards === null) {
            return res.status(404).json({'message': 'Surfboard not found!'});   
        } else {
            return res.status(200).json(surfBoards);
        }
    })
});

module.exports = router;