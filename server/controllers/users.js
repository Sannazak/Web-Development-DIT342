var express = require('express');
var router = express.Router();
var User = require('../models/users');
var FavouriteSpot = require('../models/surfSpot');
var FavouriteStore = require('../models/stores');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//read all stores or using query to filter 
router.get("/", function (req, res, next) {
    try {
        var query = User.find();
        for (var queryName in req.query) {
            if (req.query.hasOwnProperty(queryName)) {
                if (req.query[queryName]) {
                    query.where(queryName).equals(req.query[queryName]);
                }
            }
        }
        query.exec(function (err, user) {
            if (err) { return next(err); }       //is this row needed when doing try catch?
            return res.status(200).json(user)
        });
    } catch (error) {
        res.status(400).send('An error has occured.')
    };
});

//get user with id
router.get('/:id', function (req, res, next) {
    try {
        User.findById(req.params.id, function (err, user) {
            if (user !== null) {
                return res.status(200).json(user);
            } else {
                return res.status(404).send('User not found');
            }
        });
    } catch {
        return next(err).status(200).send('An error has occured');
    }
});

//patch user by id
router.patch('/:id', function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) {
            return next(err);
        } else if (user === null) {
            return res.status(404).send('User not found');
        } else {
            return res.status(200).json(user);
        }
    })
});

//put user with id
router.put('/:id', function (req, res, next) {
    try {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
            if (user === null) {
                return res.status(404).send('User not found!');
            } else {
                return res.status(200).json(user);
            }
        });
    } catch {
        return res.status(400).send('An error has occured');
    }
});

//delete user with id
router.delete('/:id', function (req, res, next) {
    try {
        User.findOneAndDelete({ _id: req.params.id }, function (err, user) {
            res.status(202).send('User deleted');
        });
    } catch {
        return res.status(400).send('An error has occured');
    }
});

//get favouriteStores from user id
router.get('/:id/favouriteStores', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).send('User not found!');
        }
        return res.status(200).json(user.favouriteStores);
    });
});

//get favouriteSpots from user id
router.get('/:id/favouriteSpots', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).send('User not found!');
        }
        return res.status(200).json(user.favouriteSpots);
    });
});

//post sfavouritespot to user
//check if duplicate
router.post('/:id/favouriteSpots', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        try {
            var favouriteSpot = new FavouriteSpot(req.body);
            favouriteSpot.save(function (err) {
                if (err) {
                    return res.status(400).send('An error has occured');
                }
            });
            user.favouriteSpots.push(favouriteSpot);
            user.save();
            return res.status(201).json(user);
        } catch {
            return res.status(400).send('An error has occured');
        }
    })
});

//delete favouriteStore from user
router.delete('/:user_id/favouriteStores/:store_id', function (req, res) {
    var userId = req.params.user_id;
    var storeId = req.params.store_id;

    User.findById(userId, function (err, user) {
        if (err) { return res.status(404).json({ 'message': 'User not fund' }); }
        if (user === null) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        try {
            if (user.favouriteStores.indexOf(storeId) !== -1) {
                let index = user.favouriteStores.indexOf(storeId);
                user.favouriteStores.splice(index, 1);
                user.save();
                res.status(202).json(user);
            } else {
                return res.status(400).json({ 'message': 'The store is not saved as favorite by the user' });
            }
        }
        catch (error) {
            return res.status(404).json({ 'message': 'Favourite store ID is incorrect.' });
        }
    });
});

//delete favouriteSpot from user
router.delete('/:user_id/favouriteSpots/:spot_id', function (req, res) {
    var userId = req.params.user_id;
    var spotId = req.params.spot_id;

    User.findById(userId, function (err, user) {
        if (err) { return res.status(404).json({ 'message': 'User not fund' }); }
        if (user === null) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        try {
            if (user.favouriteSpots.indexOf(spotId) !== -1) {
                let index = user.favouriteSpots.indexOf(spotId);
                user.favouriteSpots.splice(index, 1);
                user.save();
                res.status(202).json(user);
            } else {
                return res.status(400).json({ 'message': 'The surf spot is not saved as favorite by the user' });
            }
        }
        catch (error) {
            return res.status(404).json({ 'message': 'Favourite spot ID is incorrect.' });
        }
    });
});

router.post('/signuphashed', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.lenght >= 1) {
                return res.status(409).json({
                    message: 'Email already registered'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return json.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            fullName: req.body.fullName
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'user created', user
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    };
                })
            }
        })
});

router.post('/loginhashed', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.lenght < 1) {
                return res.status(401).json({
                    message: 'Auth failed 1'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed 2'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                    {
                        email: user[0],
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY, 
                    {
                    expiresIn: "30s"
                    });
                    return res.status(200).json({
                        message: 'Auth successfull',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed 3'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });

})

module.exports = router;
