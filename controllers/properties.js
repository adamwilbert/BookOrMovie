var Property = require("../models/property");
var dotenv = require('dotenv').load();
var rp = require('request-promise');


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
      var options =  {
        uri: 'http://www.omdbapi.com/?y=&plot=short&r=json&t='+req.query.t,
        json: true // Automatically parses the JSON string in the response
        }
        rp(options)
        .then(function (body) {
          if (body.Writer.indexOf('novel')===-1 && body.Writer.indexOf('short story')==-1)  {
            res.send('only a movie, not a book')
          }
          else{
            newProperty.movieTitle = body.Title
            newProperty.poster = body.Poster
            newProperty.movieCriticReview = body.Metascore
            newProperty.imdbRating = body.imdbRating
            for (var key in req.body){
            newProperty[key] = req.body[key]
          }
        }
        })

        options = {
        uri: 'https://www.goodreads.com/book/title.xml?key='+ process.env.BOOKS_API_KEY+'&title='+req.query.t,
        };
        rp(options)
            .then(function (body) {
              newProperty.bookCriticReview = Number(body.substring(body.indexOf('<average_rating>')+16,body.indexOf('<average_rating>')+19))/5*100
              newProperty.save(function (err) {
              if (err){
                console.log(err);
              }
              else {
                console.log('success');
              }
              res.send('Property Saved')
            })
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
  },
    movieVote: function(req, res, next){
      console.log(req.body)
    Property.findOneAndUpdate(({_id: req.params.id}), { $push: {
          movieVotes: {
            userId: req.body.userId
          }
        }
      }, function (err) {

      if (err) console.log(err)
      else res.send("Property updated")
    })
  },
  bookVote: function(req, res, next){
      console.log(req.body)
    Property.findOneAndUpdate(({_id: req.params.id}), { $push: {
          bookVotes: {
            userId: req.body.userId
          }
        }
      }, function (err) {

      if (err) console.log(err)
      else res.send("Property updated")
    })
  }


}
