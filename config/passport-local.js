const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Employee = require("../models/employee");

passport.use(
  new LocalStrategy(
    {
        usernameField : 'email',
        passReqToCallback : true
    },
    function (req,email, password, done) {
      Employee.findOne({ email: email }, function (err, employee) {
        if (err) {
          return done(err);
        }

        if (!employee || password != employee.password) {
          return done(null, false);
        }

        return done(null, employee);
      });
    }
  )
);

// serializing tha user to descide which key to kept

passport.serializeUser(function (employee, done) {
     done(null, employee.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport", err);
      return done(err);
    }
    return done(null, user);
  });
});


//   check Authentication
passport.CheckAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect("/employee/signIn");
    }
  };

  
// set authenticated user
passport.setAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the currently logged in user form the session and sending this to locals form the next view
    res.locals.user = req.user
  }
  next();
};

module.exports = passport;
