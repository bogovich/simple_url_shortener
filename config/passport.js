import { Strategy as LocalStrategy } from "passport-local";
import USER from "../models/userModel.js";

const passportConfig = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    USER.findById(id, (err, user) => done(err, user));
  });

  // Signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const emailExists = await USER.findOne({ email: req.body.email });
          const userExists = await USER.findOne({ username: username });
          if (userExists || emailExists) return done(null, false);
          let newUser = new USER({
            username: username,
            email: req.body.email,
            password: password,
          });
          newUser.save((err) => {
            if (err) throw err;
            return done(null, newUser);
          });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await USER.findOne({ username: username });
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );
          }
          const isMatch = await user.validPassword(password);
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );
};

export { passportConfig };
