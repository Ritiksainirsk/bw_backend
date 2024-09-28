const express = require("express");
const router = express.Router();

const RoleController = require("../controller/role.controller");
const awaitHandler = require("../middleware/awaitHandler.middleware");

router.post("/list", awaitHandler(RoleController.list));
router.post("/getrolelist", awaitHandler(RoleController.selectlist));
router.post("/export", awaitHandler(RoleController.createCsv));
router.post("/export-list", awaitHandler(RoleController.exportlist));
router.post("/add-edit", awaitHandler(RoleController.save));
router.post("/duplicate", awaitHandler(RoleController.duplicate));
router.post("/activate", awaitHandler(RoleController.activate));
router.post("/deactivate", awaitHandler(RoleController.deactivate));
router.post("/draft", awaitHandler(RoleController.draft));
router.post("/permanentdelete", awaitHandler(RoleController.permanentdelete));
router.get("/detail/:id", awaitHandler(RoleController.get));

module.exports = router;