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

        // If user's favorites document does not exist, create new doc object.
        if (favorite === null) {
            var favorite = new Favorites({
                postedBy: req.decoded._doc._id
            });
        }

        console.log(favorite);

        // Locate favorites document by id
        Favorites.findById(favorite._id, function (err, fav) {

            if (err) throw err;

            // If Favorites document exist, loop through list to identify duplicate
            if (fav !== null){
                for (var i = (fav.dishes.length - 1); i >= 0; i--) {
                    
                    // Check for duplicates in list
                    if (fav.dishes[i] == req.body._id){
                        var err = new Error('Dish already exists in favorite list');
                        err.status = 403;
                        return next(err);
                    }

                }
            }

            // Add to favorite dish list
            favorite.dishes.push(req.body._id);

            // Save to db
            favorite.save(function(err, favorite) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(favorite);
            });
            
        });
    });

})

module.exports = favoriteRouter;
