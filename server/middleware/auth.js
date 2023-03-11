module.exports = {
  ensureAuth: function (req, res, next) {
    console.log(req.body)
    console.log(req.user)
    if (req.isAuthenticated()) {
      
      res.json({message:'AUTHENTICATED'});
      next();
    } else {
      console.log('Bad Auth')
      res.redirect('http://localhost:3000/register');
    }
  },
  // ensureGuest: function (req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   } else {
  //     res.redirect("/profile");
  //   }
  // },
};
