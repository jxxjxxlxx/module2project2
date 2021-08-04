const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const User = require("../models/User");


/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/about", (req, res, next) => {
  res.render("about.hbs");
});

router.get("/adopt", (req, res, next) => {
  Pet.find()
  .then((listDog)=>{
    console.log("list dog",listDog)
    res.render("adopt.hbs", {dog:listDog})
  })
  .catch(e=>console.log(e));
});
router.get("/volunteer", (req, res, next) => {
  res.render("volunteer.hbs");
});
router.get("/donate", (req, res, next) => {
  res.render("donate.hbs");
});

router.get("/contact-us", (req, res, next) => {
  res.render("contactus.hbs");
});

router.get("/adopt/add-dog", (req,res,next) => {
  res.render("addDog.hbs");
});


router.post("/adopt/add-dog", (req,res,next) => {
  Pet.create(req.body)
  .then(()=>{res.redirect ("/adopt")})
  .catch(e=>console.log(e))
});

router.get("/adopt/:id/update", (req,res,next)=>{
  console.log(req.params.id)
  Pet.findById(req.params.id)
  .then((dogId)=>{
    res.render("updateDog.hbs", {dog:dogId})
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

router.get("/adopt/:id/delete", (req,res,next)=>{
  Pet.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect ("/adopt")
  })

  .catch(e=>console.log(e))
})

module.exports = router;


// MyModel.thing()
// .then((allDocuments) =>{
//   //

// })
// .catch(function(e){
//  //
// });