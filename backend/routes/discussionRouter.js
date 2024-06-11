const express = require("express");
const discussionRouter = express.Router();

const {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  addMessageToDiscussion,
  deleteDiscussion,
} = require("../controllers/discussionController");
const { authMiddleware, onlyAllow } = require("../middlewares/authMiddleware");

discussionRouter.post("/add", authMiddleware, createDiscussion);
discussionRouter.get("/all", authMiddleware, getAllDiscussions);
discussionRouter.get("/:id", authMiddleware, getDiscussionById);
discussionRouter.post("/:id/messages", authMiddleware, addMessageToDiscussion);
discussionRouter.delete(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  deleteDiscussion
);
module.exports = discussionRouter;
