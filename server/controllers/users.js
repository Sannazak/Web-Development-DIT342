var express = require('express');
var router = express.Router();
var User = require('../models/users');
var FavouriteSpot = require('../models/surfSpot');
var FavouriteStore = require('../models/stores');
const surfSpot = require('../models/surfSpot');


//get all users
router.get('/api/users', function (req, res, next) {
    User.find(function(err, user) {
        if (err) {return next(err);}
        res.json({'user': user});
    });
});

//get user with id
router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) {return next(err);}
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        res.json(user);
    });
});

//get favouriteStores from user id
router.get('/api/users/:id/favouriteStores', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) {return next(err);}
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        res.json(user.favouriteStores);
    });
});

//get favouriteSpots from user id
router.get('/api/users/:id/favouriteSpots', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) {return next(err);}
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        res.json(user.favouriteSpots);
    });
});

//patch user with id
router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        user.email = (req.body.email || user.email);
        user.fullName = (req.body.fullName || user.fullName);
        user.password = (req.body.password || user.password);
        user.skillLevel = (req.body.skillLevel || user.skillLevel);
        user.favouriteStores = (req.body.favouriteStores || user.favouriteStores);
        user.favouriteSpots = (req.body.favouriteSpots || user.favouriteSpots);
        user.boardPreference = (req.body.boardPreference || user.boardPreference);
        user.clothingSize = (req.body.clothingSize || user.clothingSize);
        user.userHeight = (req.body.userHeight || user.userHeight);
        user.userWeight = (req.body.userWeight || user.userWeight);
    user.save();
    res.json(user);
    });
});

//put user with id
router.put('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        user.email = req.body.email;
        user.fullName = req.body.fullName;
        user.password = req.body.password;
        user.skillLevel = req.body.skillLevel;
        user.favouriteShops = req.body.favouriteShops;
        user.favouriteSpots = req.body.favouriteSpots;
        user.boardPreference = req.body.boardPreference;
        user.clothingSize = req.body.clothingSize;
        user.userHeight = req.body.userHeight;
        user.userWeight = req.body.userHeight;
    user.save();
    res.json(user);
    });
});

//delete user with id
router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) {return next(err);}
        if(user === null) {
            return res.status(404).json({'message': 'User not found!'});   
        }
        res.json(user);
    });
});

//post user
router.post('/api/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err);}
        res.status(201).json(user);
    })
});

//post favouriteSpot to user
router.post('/api/users/:id/favouriteSpots', function(req, res, next) {
User.findById(req.params.id, function(err, user) {
    if(err) {return res.status(500);}
if (user === null) {
    return res.status(404).json({'message' : 'User not found'});
}
var favouriteSpot = new FavouriteSpot(req.body);
favouriteSpot.save(function(err) {
    if(err) {
        return res.status(500);
    }
});
user.favouriteSpots.push(favouriteSpot);
user.save();
return res.status(201).json(user);
})
});

//post favouriteStore to user
router.post('/api/users/:id/favouriteStores', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if(err) {return res.status(500);}
    if (user === null) {
        return res.status(404).json({'message' : 'User not found'});
    }
    var favouriteStore = new FavouriteStore(req.body);
    favouriteStore.save(function(err) {
        if(err) {
            return res.status(500);
        }
    });
    user.favouriteStore.push(favouriteStore);
    user.save();
    return res.status(201).json(user);
    })
});

//Get the info of a specific favorite spot from a specific user
router.get('/api/users/:id/favouriteSpots/:spot_Id', function(req, res) {
    var id = req.params.id;
    var spotId = req.params.spot_Id;
    User.findById(id, function(err, user) {
        if (err) {  return res.status(404).json({'message': 'User not found!', 'error': err}); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        if (user.favouriteSpots.indexOf(spotId) !== -1){
            FavouriteSpot.findById(spotId, function(err, surfSpot) {
                if (err) { return res.status(404).json({'message' : 'Spot not fund'});}
                if (surfSpot === null) {
                    return res.status(404).json({'message' : 'Spot not found'});
                } 
                res.json({'Name of spot ' : surfSpot.name, 'Data on spot ' : surfSpot});
            });
        }else{
            return res.status(400).json({'message': 'User doesnt have this spot saved as favorite'});
        }
    });
});

//Get the info of a specific favorite store from a specific user
router.get('/api/users/:user_id/favouriteStores/:store_id', function(req,res){
    var userId = req.params.user_id;
    var storeId = req.params.store_id;

    User.findById(userId, function(err, user) {
        if (err) { return res.status(404).json({'message' : 'User not fund'});}
        if (user === null) {
            return res.status(404).json({'message' : 'User not found'});
        }
        if (user.favouriteStores.indexOf(storeId) !== -1){
            FavouriteStore.findById(storeId, function(err, store) {
                if (err) { return res.status(404).json({'message' : 'Store not fund'});}
                if (store === null) {
                    return res.status(404).json({'message' : 'Store not found'});
                } 
                res.json({'Name of store ' : store.name, 'Data on store ' : store});
            });
        }else{
            return res.status(400).json({'message': 'User doesnt have this store saved as favorite'});
        }
    });
});

//delete favouriteStore from user
router.delete('/api/users/:user_id/favouriteStores/:store_id', function(req, res, next) {
    var userId = req.params.user_id;
    var storeId = req.params.store_id;
    
    User.findById(userId, function(err, user) {
        if (err) { return res.status(404).json({'message' : 'User not fund'});}
        if (user === null) {
            return res.status(404).json({'message' : 'User not found'});
        }
        try{
            let index = user.favouriteStores.indexOf(storeId);
            user.favouriteStores.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error){
            return res.status(404).json({'message' : 'Favourite store ID is incorrect.'});
        }
    });
});

//delete favouriteSpot from user
router.delete('/api/users/:user_id/favouriteSpots/:spot_id', function(req, res, next) {
    var userId = req.params.user_id;
    var spotId = req.params.spot_id;
    
    User.findById(userId, function(err, user) {
        if (err) { return res.status(404).json({'message' : 'User not fund'});}
        if (user === null) {
            return res.status(404).json({'message' : 'User not found'});
        }
        try{
            let index = user.favouriteSpots.indexOf(spotId);
            user.favouriteSpots.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error){
            return res.status(404).json({'message' : 'Favourite spot ID is incorrect.'});
        }  
    });
});   
    
module.exports = router;
