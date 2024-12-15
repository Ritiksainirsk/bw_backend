const express = require("express");
const router = express.Router();

const LoginController = require("../controller/login.controller");
const awaitHandlerLogin = require("../middleware/awaitHandlerLogin.middleware");

router.post("/admin", awaitHandlerLogin(LoginController.adminLogin));

module.exports = router;