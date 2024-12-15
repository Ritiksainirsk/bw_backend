const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    template_id: {
      type: String,
      required: true,
    },
    slugUrl: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    metaKeywords: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active","inactive","draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Page", PageSchema);
