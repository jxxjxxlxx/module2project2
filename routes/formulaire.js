const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const mongoose = require("mongoose");
const upload = require("../config/cloudinary.config");

router.get("/adopt/:id/adoption-form", (req, res, next) => {
  Pet.findbyId(req.params.id)
    .then((idDog) => {
      res.render("adoptionForm.hbs", { keyDog: idDog });
    })
    .catch((e) => console.log(e));
});


router.post("/adoption-form", (req,res,next) =>{
  console.log("coucou");

  res.render("submitForm");
});


module.exports = router;