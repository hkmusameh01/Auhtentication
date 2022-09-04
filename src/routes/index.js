const {join} = require('path')
const {handleLoginFile, handleSignupFile, signup} = require('../controllers')
const router = require('express').Router();

router.get('/login', handleLoginFile)

router.get('/register', handleSignupFile)

router.post('/register', signup)

module.exports = router;