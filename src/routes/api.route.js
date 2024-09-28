const express = require("express");
const router = express.Router();

const Controller = require("../controller/landingpage.controller");
const awaitHandler = require("../middleware/awaitHandlerPages.middleware");


router.post("/page-info", awaitHandler(Controller.LandingPageData));

module.exports = router;