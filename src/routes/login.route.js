const express = require("express");
const router = express.Router();

const LoginController = require("../controller/login.controller");
const awaitHandlerLogin = require("../middleware/awaitHandlerLogin.middleware");

router.post("/associate", awaitHandlerLogin(LoginController.associateLogin));
router.post("/super-admin", awaitHandlerLogin(LoginController.superadminLogin));
router.post("/organization", awaitHandlerLogin(LoginController.organizationLogin));
router.post("/admin", awaitHandlerLogin(LoginController.adminLogin));
router.post("/user", awaitHandlerLogin(LoginController.userLogin));

module.exports = router;