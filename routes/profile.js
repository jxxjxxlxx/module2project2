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


<<<<<<< HEAD
module.exports = router;
=======
        res.render("user-profile.hbs", {doggy : dogDoc})
    })
    .catch(e=>console.log(e))
})
module.exports = router;
>>>>>>> 1790d2e98fff6267bdb669350366d66399e2deeb
