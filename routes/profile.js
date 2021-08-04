const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const mongoose = require("mongoose");
const upload = require("../config/cloudinary.config");


router.get("/adopt", (req, res, next) => {
  Pet.findById(req.params.id)
    .then((dogDoc) => {
      res.render("user-profile.hbs", { doggy: dogDoc });
    })
    .catch((e) => console.log(e));
});


module.exports = router;
   
