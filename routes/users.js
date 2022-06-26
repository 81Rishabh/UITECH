const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");
const passport = require("passport");

router.get("/signIn", authController.signIn);
router.get("/signUp", authController.signUp);

// @post requests
// sending post request to create user
router.post("/create", authController.create);

// @port request to create session
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/employee/signIn" }),
  authController.createSession
);

// loggin out (destroing session)
router.get('/sign-out' , authController.destroySession);

module.exports = router;
