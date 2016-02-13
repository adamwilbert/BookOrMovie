var mongoose  = require('mongoose')

var propertySchema = new mongoose.Schema({
title: String,
bookTitle: String,
movieTitle: String,
movieCriticReview: Number,
bookCriticReview: Number,
movieVotes: Number,
bookVotes: Number
});

module.exports = mongoose.model('Property', propertySchema)
