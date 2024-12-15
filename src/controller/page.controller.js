const Page = require("../model/page.model");
const mongoose = require("mongoose");

// Get all pages
const getPages = async (req, res) => {
  try {
    const pages = await Page.find({})
    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single page by ID
const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate("template");
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new page
const createPage = async (req, res) => {
  try {
    const {
      title,
      template,
      slugUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
    } = req.body;

    // Validate required fields
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    // Generate a base slug from the title if no slug is provided
    let baseSlug =
      slugUrl ||
      title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    // Ensure slug is unique
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Page.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create the page with a unique slug
    const page = await Page.create({
      title,
      template_id: template || null,
      slugUrl: uniqueSlug,
      metaTitle,
      metaDescription,
      metaKeywords,
      status: status || "draft",
    });

    // Respond with the created page
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Update page
const updatePage = async (req, res) => {
  try {
    const { title, template } = req.body;
    const updateData = { ...req.body };

    // Validate template ID if provided
    if (template && !mongoose.Types.ObjectId.isValid(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template ID format",
      });
    }

    // Update slug if title is changed
    if (title) {
      updateData.slug = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
    }

    // Convert template to ObjectId if provided
    if (template) {
      updateData.template = new mongoose.Types.ObjectId(template);
    }

    updateData.updatedAt = Date.now();

    const page = await Page.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("template");

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete page
const deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
};
