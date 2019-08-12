const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/index.controller');

router.get('/', index_controller.index_show_message);



module.exports = router;
