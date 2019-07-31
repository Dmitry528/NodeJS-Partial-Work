var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const userShema = require('../models/user.model');
  userShema.find({})
  .then((result) => {
    res.send(result);
  })
});

module.exports = router;
