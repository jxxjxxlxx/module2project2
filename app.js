require("dotenv").config();
require("./config/mongodb");
require("./config/cloudinary.config");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const adoptRouter = require("./routes/adopt");
const formulaireRouter = require("./routes/formulaire");
const donateRouter = require("./routes/donate");

const app = express();
require("./config/session.config")(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    console.log("logged in")
  } else {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partial");

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", adoptRouter);
app.use("/", formulaireRouter);
app.use("/", donateRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
