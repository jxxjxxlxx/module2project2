const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const mongoose = require("mongoose");
const upload = require("../config/cloudinary.config");


router.post("/donate", (req,res,next) =>{
console.log("hello");
  res.render("submitdonate.hbs");
});

module.exports = router;