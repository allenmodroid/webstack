// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create favorite schema
var favoriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes'
    }]
}, {
    timestamps: true
});

// Create a model
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;