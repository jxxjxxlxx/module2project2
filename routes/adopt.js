


router.get("/adopt", (req, res, next) => {
    Pet.find()
    .then((listDog)=>{
      console.log("list dpog",listDog)
      res.render("adopt.hbs", {dogs:listDog})
    })
    .catch(e=>console.log(e));
  });