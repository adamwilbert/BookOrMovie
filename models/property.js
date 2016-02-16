var mongoose  = require('mongoose')

var propertySchema = new mongoose.Schema({
title: String,
bookTitle: String,
movieTitle: String,
movieCriticReview: String,
bookCriticReview: Number,
movieVotes: [{userId: String}],
bookVotes: [{userId: String}],
poster: String,
imdbRating: String
});

module.exports = mongoose.model('Property', propertySchema)
