var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Favorites = require('../models/favorites');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

//****************************************************
// Config for dish route
//****************************************************
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id })
        .populate('postedBy')
        .populate('dishes')
        .exec(function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
})


.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id }).exec(function(err, favorite) {
        if (err) throw err;

        // If user's favorites document does not exist
        if (favorite === null) {

            // Create new favorites document object
            favorite = new Favorites({
                postedBy: req.decoded._doc._id
            });
        }

        // Loop through dishes list to identify duplicate
        for (var i = (favorite.dishes.length - 1); i >= 0; i--) {

            // Check for duplicates in list
            if (favorite.dishes[i] == req.body._id){
                var err = new Error('Dish already exists in favorite list');
                err.status = 403;
                return next(err);
            }
        }

        // Add dist to favorite list
        favorite.dishes.push(req.body._id);

        // Save to db
        favorite.save(function(err, favorite) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(favorite);
        });

    })
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id }).exec(function(err, favorite) {
        if (err) throw err;

        for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
            favorite.dishes.remove(favorite.dishes[i]);
        }

        favorite.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all favorites!');
        });
    });
});

module.exports = favoriteRouter;
