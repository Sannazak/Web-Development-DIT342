var express = require('express');
var router = express.Router();

var Store =  require('../models/stores');


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
        store.save();
        res.json(store);
    });
});


module.exports = router;


