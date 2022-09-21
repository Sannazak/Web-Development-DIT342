var express = require('express');
var router = express.Router();
var SurfLesson = require('../models/surfLessons');

//get all lessons
router.get('/api/surfLessons', function (req, res, next) {
    SurfLesson.find(function (err, surfLesson) {
        if (err) { return next(err); }
        res.status(200).json( surfLesson );
    });
});

//get lessons with id
router.get('/api/surfLessons/:id', function (req, res, next) {
    var id = req.params.id;
    SurfLesson.findById(id, function (err, surfLesson) {
        if (err) { return next(err); }
        if (surfLesson === null) {
            return res.status(404).json({ 'message': 'surf lessons not found!' });
        }
        res.status(200).json(surfLesson);
    });
});

//patch lessons with id
router.patch('/api/surfLessons/:id', function (req, res, next) {
    var id = req.params.id;
    SurfLesson.findById(id, function (err, surfLesson) {
        if (err) { return next(err); }
        if (surfLesson === null) {
            return res.status(404).json({ 'message': 'surfLessons not found!' });
        } //fix smaller code
        surfLesson.name = (req.body.name || surfLesson.name);
        surfLesson.price = (req.body.price || surfLesson.price);
        surfLesson.instructor = (req.body.instructor || surfLesson.instructor);
        surfLesson.save();
        res.status(200).json(surfLesson);
    });
});

//put lessons with id
router.put('/api/surfLessons/:id', function (req, res, next) {
    var id = req.params.id;
    SurfLesson.findById(id, function (err, surfLesson) {
        if (err) { return next(err); }
        if (surfLesson === null) {
            return res.status(404).json({ 'message': 'surfLessons not found!' });
        } // fix better code
        surfLesson.name = req.body.name;
        surfLesson.price = req.body.price;
        surfLesson.instructor = req.body.instructor;
        surfLesson.save();
        res.status(200).json(surfLesson);
    });
});

//delete lessons with id
router.delete('/api/surfLessons/:id', function (req, res, next) {
    var id = req.params.id;
    SurfLesson.findOneAndDelete({ _id: id }, function (err, surfLesson) {
        if (err) { return next(err); }
        if (surfLesson === null) {
            return res.status(404).json({ 'message': 'surf lessons not found!' });
        }
        res.status(202).json(surfLesson);
    });
});

//post lessons
router.post('/api/surfLessons', function (req, res, next) {
    var surfLesson = new SurfLesson(req.body);
    surfLesson.save(function (err, surfLesson) {
        if (err) { return next(err); }
        res.status(201).json(surfLesson);
    })
});

module.exports = router;