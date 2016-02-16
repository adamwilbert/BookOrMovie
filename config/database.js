var mongoose = require('mongoose');


// Use different database URIs based on whether an env var exists.
var dbUri = 'mongodb://heroku_653r6z5k:hm4qp77s68g4quf1st708pj8fi@ds011238.mongolab.com:11238/heroku_653r6z5k';


mongoose.connect(dbUri);

module.exports = mongoose;
