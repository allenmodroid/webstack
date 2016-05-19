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
    .get(function(req, res, next) {
        Favorites.find({})
            .exec(function(err, dish) {
                if (err) throw err;
                res.json(dish);
            });
    })


.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id }).exec(function(err, favorite) {
        if (err) throw err;

        if (favorite === null) {
            var favorite = new Favorites({
                postedBy: req.decoded._doc._id
            });
        }
        console.log(favorite._id);

        Favorites.findById(favorite._id, function (err, fav) {

            if (err) throw err;

            for (var i = (fav.dishes.length - 1); i >= 0; i--) {
                if (fav.dishes[i] = req.body._id){
                    var err = new Error('Favorite dish already exists in list');
                    err.status = 403;
                    return next(err);
                }
            }

            favorite.dishes.push(req.body._id);

            favorite.save(function(err, favorite) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(favorite);
            });
        });

    });
})

module.exports = favoriteRouter;
