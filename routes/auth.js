const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
const Pet = require("../models/Pet");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;



//signin part
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
        if (user.admin) {
          console.log("admin logged in")
        } else {console.log("User logged in")};
        req.session.currentUser = user;
        req.session.admin = true;
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

//sign up part

function checkAdmin(email){
  const domain = email.substring(email.lastIndexOf("@") +1);
  return (domain === 'petlove.com');
}

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
        admin: checkAdmin(email),
      });
      //   console.log(`Password hash: ${hashedPassword}`);
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/signin");
    })
    .catch((error) => next(error));
});



//signout part
router.post("/signout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});


//Profile page


router.get("/userProfile", (req, res) => {

  Pet.find({ _id: req.session.currentUser.favorites })
    .then((userDogs) => {
      res.render("user-profile.hbs", { dogs: userDogs });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;