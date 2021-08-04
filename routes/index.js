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


router.get("/volunteer", (req, res, next) => {
  res.render("volunteer.hbs");
});
router.get("/donate", (req, res, next) => {
  res.render("donate.hbs");
});

router.get("/contact-us", (req, res, next) => {
  res.render("contactus.hbs");
});

module.exports = router;


// MyModel.thing()
// .then((allDocuments) =>{
//   //

// })
// .catch(function(e){
//  //
// });