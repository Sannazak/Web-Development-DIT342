var express = require('express');
const store = require('..models/store');
var router = express.Router();
var Store =  require('../models/store');


router.post('/api/stores', function (req, res, next){
    var store = new Store(req.body);
    
    store.save(function (err, store){ // stort S?
        if (err) {return next (err);}
   
        res.status(201).json(store);
    })
});

module.exports = router;

//router.get('/stores', function (req,res){
 //   res.json
//});