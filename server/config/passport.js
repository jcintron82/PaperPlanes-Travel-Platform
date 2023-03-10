const localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt')
const User = require("../models/User");
module.exports = function(passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({userName: username}, (err, user) => {
        if(err) throw err;
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user)
          }
          else {
            return done(null, false)
          }
        })
      })
    })
  );
    passport.serializeUser((user, cb) => {
    cb(null, user.id)
  });
  passport.deserializeUser((id, cb) => {
    console.log("DESERIALIZING")
    User.findOne({_id: id}, (err, user) => {
      cb(err, user)
    })
  });



// module.exports = function (passport) {
//   passport.use(
//     new localStrategy( (username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, { msg: `Username ${username} not found.` });
//         }
//         if (!user.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }
//         user.comparePassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );

  // passport.serializeUser((user, cb) => {
  //   cb(null, user.id);
  // });

  // passport.deserializeUser((id, cb) => {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });
};
