var mongoose  = require('mongoose')

var userSchema = new mongoose.Schema({
  google: {
    id: String,
    accessToken: String,
    displayName: String,
    image: String
  }
});

module.exports = mongoose.model('User', userSchema)
