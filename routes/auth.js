const { Router } = require("express");
const router = new Router();
const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

//SIGN-IN
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", (req, res, next) => {
  console.log("SESSION=====> ", req.session);

  const { email, password } = req.body;
  if (email === "" || password === "") {
    console.log("No email or not password");
    res.render("signin", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      console.log("After user findOne");

      if (!user) {
        console.log("In no user found");
        res.render("signin", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        console.log("Good password");
        req.session.currentUser = user;
        res.redirect("/userProfile");
      } else {
        console.log("Incorrect password");
        res.render("signin", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => {
      console.log("THERE IS AN ERROR ", error);
      next(error);
    });
});







//SIGN-UP:
router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", (req, res, next) => {
  console.log("The form data: ", req.body);
  const { name, email, password, city, phone, dateofbirth } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        name,
        email,
        phone,
        city,
        dateofbirth,
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


//SIGN-OUT:

router.post('/signout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});


//?

router.get("/userProfile", (req, res) => {
  res.render("user-profile.hbs", { userInSession: req.session.currentUser });
});

module.exports = router;