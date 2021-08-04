const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const mongoose = require('mongoose');
const upload= require ("../config/cloudinary.config");

//1.Create the dogs list 
router.get("/adopt", (req, res, next) => {
    Pet.find()
    .then((listDog)=>{
     
      res.render("adopt.hbs", {dogs:listDog})
      
    })
    .catch(e=>console.log(e));
  });


router.get("/adopt/add-dog", (req,res,next) => {
    res.render("addDog.hbs");
  });
  
  // Upload image

  router.post ("/adopt/add-dog", upload.single("image"), (req, res)=>{


    console.log("COUCOU JE SUIS LA")


   const {name, breed, description,location,adopted}= req.body;
   const newDog= {name,
     breed,
      description,
      location,
      adopted};

      console.log(req.file)
      if (req.file) newDog.image =req.file.path;
      console.log(req.file);
    
    Pet.create(newDog)
   
    .then((newDog)=> {
      res.redirect("/adopt");
    })
    .catch(error=> console.log(`Error while creating new dog:${error}`));
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
  
  //Delete the dogs 
  router.get("/adopt/:id/delete", (req,res,next)=>{
    Pet.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect ("/adopt")
    })
  
    .catch(e=>console.log(e))
  })
  
  module.exports = router;





