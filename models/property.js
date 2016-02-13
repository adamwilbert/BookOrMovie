var mongoose  = require('mongoose')

var propertySchema = new mongoose.Schema({
title: String,
bookTitle: String,
movieTitle: String,
movieReview: Number,
bookReview: Number,

});

module.exports = mongoose.model('Property', propertySchema)
