var User = require("../models/user");
var dotenv = require('dotenv').load();


module.exports = {

  all: function (req, res, next) {
    User.find({}, function (err, users) {
      res.json(users)
    })
  },

    show: function(req, res, next){
    User.find({_id: req.params.id}, function (err, user) {
      res.json(user)
    })
  },


  update: function(req, res, next){
    User.findOneAndUpdate(({_id: req.params.id}), req.body, function (err) {
      if (err) console.log(err)
      else res.send("User updated")
    })
  },

  delete: function (req, res, next){
    User.findOneAndRemove(({_id: req.params.id}), function (err, record) {
        res.send("User deleted!")
    })
  }


}
