const Tag = require("../models/tag.model");

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.json(tags);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve tags" });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve tag" });
  }
};

exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    const newTag = await Tag.create({ name });
    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create tag" });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    tag.name = name || tag.name;
    await tag.save();
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update tag" });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    await tag.destroy();
    return res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete tag" });
  }
};
