// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Adding the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create promotion schema
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default:''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }
    }, {
        timestamps: true
    });

// Create a model
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions;