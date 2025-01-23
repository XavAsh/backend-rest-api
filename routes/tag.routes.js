const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");

router.get("/", tagController.getTags); // Get all tags
router.get("/:tagId", tagController.getTagById); // Get specific tag by ID
router.post("/", tagController.createTag); // Create a new tag
router.put("/:tagId", tagController.updateTag); // Update a tag
router.delete("/:tagId", tagController.deleteTag); // Delete a tag

module.exports = router;
