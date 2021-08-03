const { Router } = require("express");
const router = new Router();
const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get("/signup", (req, res) => res.render("signup"));
router.get("/userProfile", (req, res) => res.render("user-profile"));
router.get("/signin", (req, res) => res.render("signin"));

router.post("/signup", (req, res, next) => {
  console.log("The form data: ", req.body);
  const { name, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        name,
        email,
        password: hashedPassword,
      });

      //   console.log(`Password hash: ${hashedPassword}`);
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/userProfile");
    })
    .catch((error) => next(error));
});

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("signin", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("signin", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        res.render("user-profile", { user });
      } else {
        res.render("signin", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
