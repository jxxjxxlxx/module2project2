const express = require('express');
const router = express.Router();
const Pet =require ("../models/Pet");
const User= require ("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});








module.exports = router;
