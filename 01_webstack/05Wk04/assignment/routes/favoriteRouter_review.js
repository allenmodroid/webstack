var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dish = require('../models/dishes.js');
var Favorite = require('../models/favorites.js');

var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.findOne({postedBy: req.decoded._doc._id}).populate('postedBy dishes').exec( function (err, fav) {
        if (err) throw err;
        res.json(fav);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    
    Favorite.findOneAndUpdate({postedBy: req.decoded._doc._id}, {$addToSet: {dishes: req.body._id}}, {new: true}, function (err, fav) {
        if (err) throw err;
        
        if(!fav){
            var o = {
                postedBy: req.decoded._doc._id,
                dishes: [req.body._id]
            };
            Favorite.create(o, function(err, fav){
                res.json(fav);
            });
        } else {
            res.json(fav);
        }
        
        
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.findOneAndRemove(req.decoded._doc._id, function (err, fav) {
        if (err) throw err;
        res.json(fav);
    });
    
});

favoriteRouter.route('/:favoriteId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.findOneAndUpdate(req.decoded._doc._id, {$pull: {dishes: req.params.favoriteId}}, {new: true}, function (err, fav) {
        if (err) throw err;
        res.json(fav);
    });
});

module.exports = favoriteRouter;


// ============================================


var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');
var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res) {
    Favorites.find({'postedBy': req.decoded._doc._id})
      .populate('postedBy')
      .populate('dishes')
      .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
  })

  .post(function (req, res) {
    Favorites.findOneAndUpdate({postedBy: req.decoded._doc._id},
    {
      $addToSet: {
        dishes: req.body
      }
    },
    {
      upsert: true,
      new: true
    },
    function (err, favorite) {
      if (err) throw err;
      res.json(favorite);
    });
  })

  .delete(function (req, res) {
    Favorites.findOneAndRemove({postedBy: req.decoded._doc._id}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

favoriteRouter.route('/:dishId')
  .delete(Verify.verifyOrdinaryUser, function (req, res) {
    Favorites.findOneAndUpdate({'postedBy': req.decoded._doc._id}, function (err, favorite) {
      if (err) return err;
      favorite.dishes.remove(req.params.dishId);
      favorite.save(function (err, resp) {
        if (err) throw err;
        console.log(err);
        res.json(resp);
      });
    });
  });

module.exports = favoriteRouter;


// ============================================


var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({'postedBy': req.decoded._doc._id})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorites) {
                if (err) throw err;
                res.json(favorites);
            });
    })
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOneAndUpdate({'postedBy': req.decoded._doc._id}, {$addToSet: {'dishes': req.body}}, function (err, favorites) {
            if (err) throw err;
            console.log(favorites);
            if (favorites)  res.json(favorites);
            else {
                var newfavorite = new Favorites({
                    postedBy: req.decoded._doc._id,
                    dishes: [req.body]
                });

                newfavorite.save(function (err, newFavorite) {
                    if (err) throw err;
                    console.log('Favorites created!');
                    res.json(newFavorite);
                });
            }
        });
    })
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOneAndRemove({'postedBy': req.decoded._doc._id}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
favoriteRouter.route('/:dishObjectId')
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOneAndUpdate({'postedBy': req.decoded._doc._id}, {$pull: {dishes: req.params.dishObjectId}}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = favoriteRouter;
