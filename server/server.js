const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session")
const mongoose = require("mongoose");
const bp = require('body-parser')
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile");
const cookieParser = require("cookie-parser");
// const postRoutes = require("./routes/posts");
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['https://paper-planes-travel-platform.vercel.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
})
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
// app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB



app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
  }
  })
);
app.use(passport.authenticate('session'));
app.use(cookieParser("secretcode"))

//Use flash messages for errors, info, ect...

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

app.use(flash());

// Server Running
app.listen(10000, () => {
  console.log("Server is running on port 8000");
});
app.use(express.json());
