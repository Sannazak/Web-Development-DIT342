var express = require('express');
var router = express.Router();
var Store =  require('../models/stores');
var SurfLessons = require('../models/surfLessons');
var SurGears = require('../models/surfGear');

//create a store
router.post('/api/stores', function (req, res, next){
    var store = new Store(req.body);
    
    store.save(function (err, store){
        if (err) {return next (err);}
   
        res.status(201).json(store);
    })
});

//read all stores
router.get("/api/stores", function (req, res, next) {
    Store.find(function(err, store) {
        if (err) {return next(err);}
        res.json({'store': store});
    });
});

router.get('/api/stores/:id', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.json(store);
    });
});

router.delete('/api/stores', function(req, res, next){
    Store.deleteMany(function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.json(store);
    });
});



router.delete('/api/stores/:id', function(req, res, next){
    var id = req.params.id;
    Store.findOneAndDelete({_id: id}, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.json(store);
    });
});

router.put('/api/stores/:id', function(req, res, next) {
    var id = req.params.id;
    Store.findById(id, function(err, store) {
        if (err) { return next(err); }
        if (store == null) {
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
        store.save();
        res.json(store);
    });
});

router.patch('/api/stores/:id', function(req, res, next) {
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
        store.save();
        res.json(store);
    });
});

router.get('/api/stores/:id/surfGears', function(req, res, next){
    var id = req.params.id;
    Store.findById(id, function(err, store){
        if(err) {return next(err);}
        if(store === null){
            return res.status(404).json({'message': 'Store not found'});
        }
        res.json(store.surfGear);
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
                res.json({'Name of gear ' : surfGear.name, 'Data on store ' : surfGear});
            });
        }else{
            return res.status(400).json({'message': 'This gear is not saved on this store'});
        }
    });
});

module.exports = router;


