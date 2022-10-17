var express = require('express');
var router = express.Router();
var Store =  require('../models/stores');
var SurfLessons = require('../models/surfLessons');
var SurfGears = require('../models/surfGear');
var SurfBoards = require('../models/surfBoards');

//create a store
router.post('/', function (req, res, next){
    var store = new Store(req.body);
    //TO DO: Check if unique name already exist
    store.save(function (err, store){
        if (err) {return next(err);}
   
        res.status(201).json(store);
    })
});

//read all stores or using query to filter 
router.get("/", function (req, res, next) {
    try{
        var query = Store.find();
        for (var queryName in req.query){
            if(req.query.hasOwnProperty(queryName)){
                if(req.query[queryName]){
                    query.where(queryName).equals(req.query[queryName]);
                }
            }
        }
        query.exec(function(err, store){
            if(err) { return next(err); }
            res.status(200).json(store)
        });
    }catch(error){
        res.status(404).json()
    };
});

//Get store by id
router.get('/:id', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(200).json(store);
    });
});

//Delete all the stores
router.delete('/', function(req, res, next){
    Store.deleteMany(function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(202).json(store);
    });
});

//Delete stores by the id
router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Store.findOneAndDelete({_id: id}, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(202).json(store);
    });
});


//Put new information to the store
router.put('/:id', function (req, res, next) {
    try {
        Store.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, store) {
            if (store === null) {
                return res.status(404).send('Store not found!');
            } else {
                return res.status(200).json(store);
            }
        });
    } catch {
        return res.status(400).send('An error has occured');
    }
});


router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Store.findByIdAndUpdate(id, req.body, {new:true}, function(err, store) {
        if (err) { 
            return next(err); 
        } else if (store === null) {
            return res.status(404).send('Store not found');
        } else { 
            return res.status(200).json(store)
        }
    });
});

//Get all gears by the surf id
router.get('/:id/surfGears', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(200).json(store.surfGears);
    });
});

//Get all lessons by the surf id
router.get('/:id/surfLessons', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(200).json(store.surfLessons);
    });
});

//Get all boards by the surf id
router.get('/:id/surfBoards', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(200).json(store.surfBoards);
    });
});

//post surfGear to store
router.post('/:id/surfGears', function(req, res, next) {
    Store.findById(req.params.id, function(err, store) {
        if(err) {return next(err);}
    if (store === null) {
        return res.status(404).json({'message' : 'Store not found'});
    }
    var surfGears = new SurfGears(req.body);
    surfGears.save(function(err) {
        if(err) {
            return res.status(400);
        }
    });
    store.surfGears.push(surfGears);
    store.save();
    return res.status(201).json(store);
    })
});

//post surfLesson to store
router.post('/:id/surfLessons', function(req, res, next) {
    Store.findById(req.params.id, function(err, store) {
        if(err) {return next(err);}
    if (store === null) {
        return res.status(404).json({'message' : 'Store not found'});
    }
    var surfLessons = new SurfLessons(req.body);
    surfLessons.save(function(err) {
        if(err) {
            return res.status(400);
        }
    });
    store.surfLessons.push(surfLessons);
    store.save();
    return res.status(201).json(store);
    })
});

//post surfBoards to store
router.post('/:id/surfBoards', function(req, res, next) {
    Store.findById(req.params.id, function(err, store) {
        if(err) {return next(err);}
    if (store === null) {
        return res.status(404).json({'message' : 'Store not found'});
    }
    var surfBoards = new SurfBoards(req.body);
    surfBoards.save(function(err) {
        if(err) {
            return res.status(400);
        }
    });
    store.surfBoards.push(surfBoards);
    store.save();
    return res.status(201).json(store);
    })
});

//Get the info of a specific gear from a specific store
router.get('/:store_id/surfGears/:gear_id', function(req, res){
    var gearId = req.params.gear_id;
    var storeId = req.params.store_id;

    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not fund'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        if (store.surfGear.indexOf(gearId) !== -1){
            SurfGears.findById(gearId, function(err, surfGear) {
                if (err) { return res.status(404).json({'message' : 'Gear not fund'});}
                if (surfGear === null) {
                    return res.status(404).json({'message' : 'Gear not found'});
                } 
                //May need change of the response
                res.status(200).json({'Name of gear ' : surfGear.name, 'Data on store ' : surfGear});
            });
        }else{
            return res.status(400).json({'message': 'This gear is not saved on this store'});
        }
    });
});

//Get the info of a specific lesson from a specific store
router.get('/:store_id/surfLessons/:lesson_id', function(req, res){
    var lessonId = req.params.lesson_id;
    var storeId = req.params.store_id;

    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not found'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        if (store.surfLessons.indexOf(lessonId) !== -1){
            SurfLessons.findById(lessonId, function(err, surfLessons) {
                if (err) { return res.status(404).json({'message' : 'Lesson not found'});}
                if (surfLessons === null) {
                    return res.status(404).json({'message' : 'Lesson does not exists'});
                } 
                res.status(200).json({'Name of the lesson ' : surfLessons.name, 'Data on the lesson ' : surfLessons});
            });
        }else{
            return res.status(400).json({'message': 'This lesson is not saved on this store'});
        }
    });
});

//Get the info of a specific board from a specific store
router.get('/:store_id/surfBoards/:board_id', function(req, res){
    var boardId = req.params.board_id;
    var storeId = req.params.store_id;

    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not found'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        if (store.surfBoards.indexOf(boardId) !== -1){
            SurfBoards.findById(boardId, function(err, surfBoards) {
                if (err) { return res.status(404).json({'message' : 'Board not found'});}
                if (surfBoards === null) {
                    return res.status(404).json({'message' : 'Board does not exists'});
                } 
                res.status(200).json({'Name of the board ' : surfBoards.name, 'Data on the board ' : surfBoards});
            });
        }else{
            return res.status(400).json({'message': 'This lesson is not saved on this store'});
        }
    });
});

//Delete a specific gear from a specific store
router.delete('/:store_id/surfGears/:gear_id', function(req, res, next) {
    var gearId = req.params.gear_id;
    var storeId = req.params.store_id;
    
    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not found'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        try{
            if (store.surfGear.indexOf(gearId) !== -1){
                let index = store.surfGear.indexOf(gearId);
                store.surfGear.splice(index, 1);
                store.save();
                res.status(202).json(store);
            }else{
                return res.status(400).json({'message': 'This gear is not saved on this store'});
            }
        }
        catch(error){
            return res.status(404).json({'message' : 'Gear ID is incorrect.'});
        }
    });
});

//Delete a specific lesson from a specific store
router.delete('/:store_id/surfLessons/:lesson_id', function(req, res, next) {
    var lessonId = req.params.lesson_id;
    var storeId = req.params.store_id;
    
    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not found'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        try{
            if (store.surfLessons.indexOf(lessonId) !== -1){
                let index = store.surfLessons.indexOf(lessonId);
                store.surfLessons.splice(index, 1);
                store.save();
                res.status(202).json(store);
            }else{
                return res.status(400).json({'message': 'This lesson is not saved on this store'});
            }
        }
        catch(error){
            return res.status(404).json({'message' : 'Lesson ID is incorrect.'});
        }
    });
});

module.exports = router;


