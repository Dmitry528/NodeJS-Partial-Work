var express = require('express');
var router = express.Router();

const signIn_controller = require('../controllers/signIn.controller');

router.get('/', signIn_controller.signIn_page_get);

module.exports = router;
