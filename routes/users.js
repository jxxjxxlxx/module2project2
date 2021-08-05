const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/users/:id/favorites/add", (req, res, next) => {
  console.log("user", req.session.currentUser);
  console.log("dog ", req.params.id);

  User.findByIdAndUpdate(
    req.session.currentUser,
    {
      $addToSet: { favorites: req.params.id },
    },
    { new: true }
  ).populate("favorites")
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;

      res.redirect("/userProfile");
    })
    .catch((e) => console.log(e));

  // res.render("user-profile.hbs")
});



module.exports = router;
