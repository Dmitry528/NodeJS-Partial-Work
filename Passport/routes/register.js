const express = require('express');
const router = express.Router();

const register_controller = require('../controllers/register.controller');

router.get('/', register_controller.register_page_get);
router.post('/', register_controller.validation, register_controller.checkDB, register_controller.register_page_post);

module.exports = router;

// flash messages, passport, jwt, secure index