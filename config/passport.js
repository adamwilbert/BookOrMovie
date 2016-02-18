//no longer using passport for backend authentication, saving in case I change my mind.

// var User = require('../models/user');
// var GoogleStrategy = require('passport-google').OAuth2Strategy;

// module.exports = function(passport){
//   passport.serializeUser(function(user, done) {
//     done(null, user._id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://bookormovie.herokuapp.com/auth/google/callback"
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//       console.log(profile)
//       // console.log(User.findOne)
//       User.findOne({ 'google.id' : profile.id }, function(err, user) {
//         // console.log(user)
//         if (err) return done(err);
//         if (user) {
//           return done(null, user);
//         } else {
//           var newUser = new User();
//           newUser.google.id         = profile.id;
//           newUser.google.accessToken = accessToken;
//           newUser.google.displayName         = profile.displayName;
//           newUser.google.image = profile.photos[0].value;
//           newUser.save(function(err){
//             if (err)
//               throw err;

//             return done(null, newUser);
//           });
//         }
//       });
//   }));

// }
