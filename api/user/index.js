const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/signup", ctrl.showSignupPage);

router.get("/login", ctrl.showLoginPage);

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);

router.get("/logout", ctrl.logout);

module.exports = router;
