const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/db');
const Recipe = require('../models/recipe')

mongoose.connect(config.db);

mongoose.promise = global.promise;

mongoose.connect(config.db, (err) => {
    if (err) {
        console.error('database error: ' + err);
    }
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.db);
});

router.get('/recipes', (req, res) => {
    console.log('Get request for all recipes');
    Recipe.find({})
        .exec((err, recipes) => {
            if (err) {
                console.log('Error retrieving recipes');
            } else {
                res.json(recipes);
            }
        });
});

router.get('/recipes/:id', (req, res) => {
    console.log('Get request for single recipe');
    Recipe.findById(req.params.id)
        .exec((err, recipe) => {
            if (err) {
                console.log('Error retrieving recipe');
            } else {
                res.json(recipe);
            }
        });
});

router.post('/recipe', (req, res) => {
    console.log('Post a recipe');
    let newRecipe = new Recipe();
    newRecipe.name = req.body.name;
    newRecipe.ingredients = req.body.ingredients;
    newRecipe.description = req.body.description;
    newRecipe.save((err, createdRecipe) => {
        if (err) {
            console.log('Error saving recipe');
        } else {
            res.json(createdRecipe);
        }
    });
});

router.put('/recipe/:id', (req, res) => {
    console.log('Update a recipe');
    Recipe.findByIdAndUpdate(req.params.id, {
            $set: { name: req.body.name, ingredients: req.body.ingredients, description: req.body.description }
        }, {
            new: true
        },
        (err, updatedRecipe) => {
            if (err) {
                res.send('Error updating recipe');
            } else {
                res.json(updatedRecipe);
            }
        }
    );
});

router.delete('/recipe/:id', (req, res) => {
    console.log('Delete a recipe')
    Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
        if (err) {
            res.send('Error deleting recipe');
        } else {
            res.json(deletedRecipe);
        }
    });
});

module.exports = router;