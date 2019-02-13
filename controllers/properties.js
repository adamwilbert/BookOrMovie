var Property = require("../models/property");
var dotenv = require('dotenv').load();
var rp = require('request-promise');


module.exports = {

  all: function (req, res) {
    Property.find({}, function (err, properties) {
      res.json(properties)
    })
  },

  show: function (req, res) {
    Property.find({ _id: req.params.id }, function (err, property) {
      res.json(property)
    })
  },

  create: function (req, res) {
    var newProperty = new Property();

    var options = {
      uri: `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&y=&plot=short&r=json&t=${req.query.t}`,
      json: true // Automatically parses the JSON string in the response
    }
    rp(options)

      // after request promise returns from omdb api, we run a check on the writing credit of the movie.  if the movie's writing credit does not include 'novel' or 'short story' (how omdb classifies writing credits for books) the function stops and sends back a message that the property is only a movie, not also a book.  if it clears this test, it saves the information to a newProperty object and then moves on.
      .then(function (body) {
        if (body.Writer.indexOf('novel') === -1 && body.Writer.indexOf('short story') == -1) {
          return res.send('only a movie, not a book')
        }
        else {
          newProperty.movieTitle = body.Title
          newProperty.poster = body.Poster
          newProperty.movieCriticReview = body.Metascore
          newProperty.imdbRating = body.imdbRating
          for (var key in req.body) {
            newProperty[key] = req.body[key]
          }
        }
      })
      .catch((err => res.status(400).send(err)))


    // here we reset our options to make a another request/promise call this time to the book api.
    options = {
      uri: `https://www.goodreads.com/book/title.xml?key=${process.env.BOOKS_API_KEY}&title=${req.query.t}`,
    };
    rp(options)
      .then(function (body) {
        // good reads api returns xml, so we find the indexOf average rating, where our review score will be.  once we do that we add 16 characters to it (the length of '<average_rating>') and make a substring 4 characters long because we want a num with 2 digit decimal.  we divide that by 5 because good reads api is a 5 star based review, multiply by 100 to get our metascore that we can compare to the omdb api review.  We have to round it here to deal binary problems
        newProperty.bookCriticReview = Math.round(Number(body.substring(body.indexOf('<average_rating>') + 16, body.indexOf('<average_rating>') + 19)) / 5 * 100)
        // do some validation to make sure we want to
        if (newProperty.movieTitle && newProperty.movieCriticReview && newProperty.bookCriticReview) {
          newProperty.save(function (err) {
            if (err) {
              console.log(err);
            }
            else {
              console.log('success');
            }

            res.send('Property Saved')
          })
        }

      })
      .catch((err => res.status(400).send(err)))

  },


  update: function (req, res) {
    Property.findOneAndUpdate(({ _id: req.params.id }), req.body, function (err) {
      if (err) console.log(err)
      else res.send("Property updated")
    })
  },

  delete: function (req, res) {
    Property.findOneAndRemove(({ _id: req.params.id }), function (err, record) {
      res.send("Property deleted!")
    })
  },

  // pushes votes to array based on our object given from ionic
  movieVote: function (req, res) {
    Property.findOneAndUpdate(({ _id: req.params.id }), {
      $push: {
        movieVotes: {
          "userId": req.body.userId
        }
      }
    }, function (err) {

      if (err) console.log(err)
      else res.send("Property updated")
    })
  },
  bookVote: function (req, res) {
    Property.findOneAndUpdate(({ _id: req.params.id }), {
      $push: {
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
