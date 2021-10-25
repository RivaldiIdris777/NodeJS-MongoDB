const express = require('express');
const router = express.Router();
const { userRegister, userLogin } = require('../Controller/User');

router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router;