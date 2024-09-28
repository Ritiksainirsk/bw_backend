const express = require("express");
const router = express.Router();

const Controller = require("../controller/fileupload.controller");
const awaitHandler = require("../middleware/awaitHandlerFile.middleware");


// router.post("/sfu", awaitHandler(Controller.singleFileUpload)); // single file upload
// router.post("/mfu", awaitHandler(Controller.multipleFileUpload)); // multiple file upload

router.post("/siu", awaitHandler(Controller.singleImageUpload)); // single images upload
// router.post("/miu", awaitHandler(Controller.multipleImageUpload)); // multiple image upload


module.exports = router;