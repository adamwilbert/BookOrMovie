var Property = require("../models/property");
var dotenv = require('dotenv').load();


module.exports = {

  all: function (req, res, next) {
    Property.find({}, function (err, properties) {
      res.json(properties)
    })
  },

    show: function(req, res, next){
    Property.find({_id: req.params.id}, function (err, property) {
      res.json(property)
    })
  },

  create: function(req, res, next) {

        var newProperty = new Property();
        for (var key in req.body){
          newProperty[key] = req.body[key]
        }
        newProperty.save(function (err) {
        if (err) console.log(err)
        else res.send('New Property created!')
      })
    },


  update: function(req, res, next){
    Property.findOneAndUpdate(({_id: req.params.id}), req.body, function (err) {
      if (err) console.log(err)
      else res.send("Property updated")
    })
  },

  delete: function (req, res, next){
    Property.findOneAndRemove(({_id: req.params.id}), function (err, record) {
        res.send("Property deleted!")
    })
  }


}
