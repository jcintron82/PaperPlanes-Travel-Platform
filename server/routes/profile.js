const express = require("express");
const passport = require('../config/passport')
const router = express.Router();
const profileController = require('../controllers/auth.js');
const { ensureAuth } = require('../middleware/auth');


// router.post('/', ensureAuth, profileController.getProfile);
// router.get('/', ensureAuth, profileController.returnProfile);

// router.get('/', profileController.postLogin,  profileController.postLogin);

// router.get("/", ensureAuth)



module.exports = router


module.exports = router;