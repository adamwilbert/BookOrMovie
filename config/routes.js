var express   = require('express'),
    router    = express.Router(),
    passport  = require('passport');
require("../config/passport")(passport)
var User = require("../models/user");

var usersController   = require('../controllers/users');
var propertiesController = require('../controllers/properties')


router.get('/', function(req, res, next){
  res.send('hello world')
  next()
});

//api paths
router.get('/properties/api', propertiesController.all)
router.post('/properties/api', propertiesController.create)
router.get('/properties/api/:id', propertiesController.show)
router.put('/properties/api/:id', propertiesController.update)
router.delete('/properties/api/:id', propertiesController.delete)


module.exports = router
