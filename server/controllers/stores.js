var express = require('express');
var router = express.Router();
var Store =  require('../models/stores');
var SurfLessons = require('../models/surfLessons');
var SurGears = require('../models/surfGear');
//const { validate } = require('../models/surfGear');
//const { query } = require('express');

//create a store
router.post('/api/stores', function (req, res, next){
    var store = new Store(req.body);
    //TO DO: Check if unique name already exist
    store.save(function (err, store){
        if (err) {return res.status(400);}
   
        res.status(201).json(store);
    })
});

//read all stores or using query to filter 
router.get("/api/stores", function (req, res, next) {
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
router.get('/api/stores/:id', function(req, res, next){
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
router.delete('/api/stores', function(req, res, next){
    Store.deleteMany(function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(202).json(store);
    });
});

//Delete stores by the id
router.delete('/api/stores/:id', function(req, res, next){
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
router.put('/api/stores/:id', function(req, res, next) {
    //TO DO fix the code to make it shorter
    var id = req.params.id;
    Store.findById(id, function(err, store) {
        if (err) { return next(err); }
        if (store === null) {
            return res.status(404).json({"message": "Storet not found"});
        }
        store.name = req.body.name;
        store.adress = req.body.adress;
        store.country = req.body.country;
        store.street = req.body.street;
        store.streetNr = req.body.streetNr;
        store.postalCode = req.body.postalCode;
        store.city = req.body.city;
        store.surfGear = req.body.surfGear;
        store.surfLessons = req.body.surfLessons;
        store.save();
        res.status(201).json(store);
    });
});

router.patch('/api/stores/:id', function(req, res, next) {
    //TO DO fix the code to make it shorter
    var id = req.params.id;
    Store.findById(id, function(err, store) {
        if (err) { return next(err); }
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
        }
        store.name = (req.body.name || store.name);
        store.adress = (req.body.adress || store.adress);
        store.country = (req.body.country || store.country);
        store.street = (req.body.street || store.street);
        store.streetNr = (req.body.streetNr || store.streetNr);
        store.postalCode = (req.body.postalCode || store.postalCode);
        store.city = (req.body.city || store.city);
        store.surfGear = (req.body.surfGear || store.surfGear);
        store.surfLessons = (req.body.surfLessons || store.surfLessons);
        store.category = (req.body.category || store.category);
        store.save();
        res.status(201).json(store);
    });
});

//Get all gears byt the surf id
router.get('/api/stores/:id/surfGears', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.status(200).json(store.surfGear);
    });
});

//Get the info of a specific gear from a specific store
router.get('/api/stores/:store_id/surfGears/:gear_id', function(req, res){
    var gearId = req.params.gear_id;
    var storeId = req.params.store_id;

    Store.findById(storeId, function(err, store) {
        if (err) { return res.status(404).json({'message' : 'Store not fund'});}
        if (store === null) {
            return res.status(404).json({'message' : 'Store does not exists'});
        }
        if (store.surfGear.indexOf(gearId) !== -1){
            SurGears.findById(gearId, function(err, surfGear) {
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
router.get('/api/stores/:store_id/surfLessons/:lesson_id', function(req, res){
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

//Delete a specific gear from a specific store
router.delete('/api/stores/:store_id/surfGears/:gear_id', function(req, res, next) {
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
router.delete('/api/stores/:store_id/surfLessons/:lesson_id', function(req, res, next) {
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


