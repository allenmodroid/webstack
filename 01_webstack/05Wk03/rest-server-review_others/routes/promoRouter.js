var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Promotions = require('../models/promotions');
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

//****************************************************
// Config for promo route
//****************************************************
promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Promotions.create(req.body, function (err, promotion) {
            if (err) throw err;
            console.log('promotion created!');
            var id = promotion._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Promotions.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

//****************************************************
// Config for promo route with parameter
//****************************************************
promoRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Promotions.findById(req.params.dishId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Promotions.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Verify.verifyAdmin (req, function (err, resp) {
        // Catch error and throw
        if (err) throw err;
        Promotions.findByIdAndRemove(req.params.dishId, function (err, resp) {        
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = promoRouter;

