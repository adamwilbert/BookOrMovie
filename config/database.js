var mongoose = require('mongoose');


// Use different database URIs based on whether an env var exists.
var dbUri = 'mongodb://localhost:27017/bookormovie';


mongoose.connect(dbUri);

module.exports = mongoose;
