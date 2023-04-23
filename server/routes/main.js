const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuth } = require("../middleware/auth");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const hotelsController = require("../controllers/hotels");
const flightPriceconfirmationController = require("../controllers/flightconfirmation");
const registerController = require("../controllers/register");
const locationsRatings = require("../controllers/locationratings");

router.get("/locationratings", locationsRatings.getResults);
router.post("/locationratings", locationsRatings.postToAPI);
router.get("/query", homeController.getIndex);
router.post("/query", homeController.searchInput);
router.get("/hotels", hotelsController.getHotels);
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      debug: true,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({ message: "Successfully Authenticated!" });
          console.log(req.user);
          console.log(req.signedCookies )
        });
      }
    }
  )(req, res, next);
});

router.get("/getUser", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: req.user });
  } else {
    console.log("Bad Auth");
    res.json({ message: "Bad auth" });
      res.redirect('http://localhost:3000/register');
  }
});

router.post('/logout', function(req, res, next) {
  req.logOut(function(err) {
    console.log(req.user)
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/');
  });
});


router.post("/register", registerController.postUser);

router.post("/flightconfirmation",flightPriceconfirmationController.confirmFlight);
module.exports = router;
