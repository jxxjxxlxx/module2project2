const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const mongoose = require('mongoose');

//1.Create the dogs list 
router.get("/adopt", (req, res, next) => {
    Pet.find()
    .then((listDog)=>{
      console.log("list dog",listDog)
      res.render("adopt.hbs", {dogs:listDog})
    })
    .catch(e=>console.log(e));
  });


router.get("/adopt/add-dog", (req,res,next) => {
    res.render("addDog.hbs");
  });
  
  
  router.post("/adopt/add-dog", (req,res,next) => {
    Pet.create(req.body)
    .then(()=>{res.redirect ("/adopt")})
    .catch(e=>console.log(e))
  });
  
//Update the dogs list
  router.get("/adopt/:id/update", (req,res,next)=>{
    console.log(req.params.id)
    Pet.findById(req.params.id)
    .then((dogId)=>{
      res.render("updateDog.hbs", {dogs:dogId})
    }) 
    .catch(e=>console.log(e))
  });
  
  router.post("/adopt/:id/update", (req,res,next)=>{
    Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updateDog)=>{
      res.redirect ("/adopt")
    })
    .catch(e=>console.log(e))
  });
  
  //Update the dogs list
  router.get("/adopt/:id/delete", (req,res,next)=>{
    Pet.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect ("/adopt")
    })
  
    .catch(e=>console.log(e))
  })
  
  module.exports = router;