const express = require("express");
const router = express.Router();

const {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate
} = require("../controller/template.controller.js");

// Get all templates
router.get("/", getTemplates);

// Get single template
router.get("/:id", getTemplateById);

// Create new template
router.post("/", createTemplate);

// Update template
router.put("/:id", updateTemplate);

// Delete template
router.delete("/:id", deleteTemplate);

module.exports = router;
