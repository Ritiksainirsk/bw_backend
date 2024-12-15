const express = require("express");
const router = express.Router();

const {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage
} = require("../controller/page.controller");

// Get all pages
router.get("/", getPages);

// Get single page
router.get("/:id", getPageById);

// Create new page
router.post("/", createPage);

// Update page
router.put("/:id", updatePage);

// Delete page
router.delete("/:id", deletePage);

module.exports = router;
