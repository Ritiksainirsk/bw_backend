const express = require("express");
const router = express.Router();

const Controller = require("../controller/pagemanagement.controller");
const awaitHandler = require("../middleware/awaitHandler.middleware");

router.post("/table-setting", awaitHandler(Controller.tablesetting));
router.post("/save-table-setting", awaitHandler(Controller.savetablesetting));

router.post("/list", awaitHandler(Controller.list));
router.post("/add-edit", awaitHandler(Controller.save));
router.post("/duplicate", awaitHandler(Controller.duplicate));
router.post("/activate", awaitHandler(Controller.activate));
router.post("/deactivate", awaitHandler(Controller.deactivate));
router.post("/draft", awaitHandler(Controller.draft));
router.post("/permanentdelete", awaitHandler(Controller.permanentdelete));
router.get("/detail/:id", awaitHandler(Controller.get));
router.post("/get-page-details", awaitHandler(Controller.getPageDetails));
module.exports = router;