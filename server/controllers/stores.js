var express = require('express');
var router = express.Router();

var Store =  require('../models/stores');

router.post('/api/stores', function (req, res, next){
    var store = new Store(req.body);
    
    store.save(function (err, store){
        if (err) {return next (err);}
   
        res.status(201).json(store);
    })
});

//get all users
router.get("/api/stores", function (req, res, next) {
    Store.find(function(err, store) {
        if (err) {return next(err);}
        res.json({'store': store});
    });
});

module.exports = router;


