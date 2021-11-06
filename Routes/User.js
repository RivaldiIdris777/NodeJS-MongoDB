const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userLogout, loginPage, registerPage, verifyEmail, dashboard  } = require('../Controller/User');

router.get('/loginUser', loginPage)
router.get('/registerUser', registerPage)
router.get('/dashboard',  dashboard)

router.post('/signup', userRegister);
router.get('/verify-email', verifyEmail)
router.post('/login', userLogin);
router.post('/logout', userLogout);

module.exports = router;