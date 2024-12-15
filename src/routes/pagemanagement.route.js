const express = require("express");
const router = express.Router();

const Controller = require("../controller/pagemanagement.controller");
const awaitHandler = require("../middleware/awaitHandler.middleware");

router.post("/table-setting", awaitHandler(Controller.tablesetting));
module.exports = router;