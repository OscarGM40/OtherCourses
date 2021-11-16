const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login success",
      user: req.user,
      //  cookies: req.cookies, podría mandar las cookies o el token aqui,es el endpoint donde debo mandar lo que quiera al front
    });
  }
});

// RUTAS COMUNES para el failed y el success
router.get("/login/failed", (req, res) => {
  res.status(404).json({ success: false, message: "Login failed" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

//  RUTAS SEGÚN ESTRATEGIA
// 1ª RUTA: LOGIN CON GOOGLE
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// 2ª RUTA: LOGIN CON GITHUB
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
