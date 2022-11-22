import { Router } from "express";
import { passportConfig } from "../config/passport.js";
import passport from "passport";
//import { jDataHTML } from "../helper/json-transform.js";
import { htmlFromJson } from "../helper/json-transform.js";
import { localGetURLS } from "../controllers/urls.js";
passportConfig(passport);
const router = Router();

// GET
router.get("/", (req, res) =>
  res.render("index", {
    isAuth: req.isAuthenticated(),
    user: req.user,
  })
);

router.get("/login", (req, res) =>
  res.render("login", {
    message: req.flash("loginMessage"),
    isAuth: req.isAuthenticated(),
    user: req.user,
  })
);

router.get("/signup", (req, res) =>
  res.render("signup", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    message: "",
  })
);

router.get("/logout", async (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        res.clearCookie(process.env.SESSION_NAME);
        return res.redirect("/");
      }
    });
  }
});

router.get("/myurls", isLoggedIn, async (req, res) => {
  let userData = await localGetURLS(req.user.username);
  let jsonTable = await htmlFromJson(userData);

  res.render("myurls", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    jDataHTML: jsonTable,
  });
});

// POST

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);
// HELPER

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

export { router as authRouter };
