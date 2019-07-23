var express = require('express');
var router = express.Router();

/* GET users listing. */

// router.get('/userId', (req, res) => {
//   res.send('usersById');
// }); This is url - /users/userId

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
