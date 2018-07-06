const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: true
    },
    ingredients: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('recipe', recipeSchema, 'recipes');