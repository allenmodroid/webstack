var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Dishes = require('../models/dishes');
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//****************************************************
// Config for dish route
//****************************************************
dishRouter.route('/')

.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;

        // Create dishes
        Dishes.create(req.body, function (err, dish) {
            if (err) throw err;
            console.log('Dish created!');
            var id = dish._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the dish with id: ' + id);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;

        // Delete dishes
        Dishes.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
   });
});


//****************************************************
// Config for dish route with parameter
//****************************************************
dishRouter.route('/:dishId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;

        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;

        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

//****************************************************
// Config for comment route
//****************************************************
dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    });
});

//****************************************************
// Config for comment route with parameter
//****************************************************
dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Dishes.findById(req.params.dishId, function (err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });
});

module.exports = dishRouter;
