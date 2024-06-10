const Discussion = require("../models/discussionModel");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

const createDiscussion = asyncHandler(async (req, res) => {
  const { topic } = req.body;

  // adding discussion to database
  const discussion = new Discussion({
    topic,
  });
  await discussion.save();

  res.send({
    status: "true",
    message: "New discussion created",
    body: discussion,
  });
});

const getAllDiscussions = asyncHandler(async (req, res) => {
  // find all discussions and show messages
  const discussions = await Discussion.find().populate("messages");

  res.send({
    status: "true",
    message: "All discussions fetched successfully",
    body: discussions,
  });
});

const getDiscussionById = asyncHandler(async (req, res) => {
  // find the discussion and show all messages
  const discussion = await Discussion.findById(req.params.id).populate(
    "messages"
  );

  if (!discussion) {
    res.status(404).send({
      status: "false",
      message: "Discussion not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Discussion found successfully",
    body: discussion,
  });
});

const addMessageToDiscussion = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const user = req.user._id;

  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) {
    res.status(404).send({
      status: "false",
      message: "Discussion not found",
    });
    return;
  }

  const message = new Message({
    user,
    content,
  });

  await message.save();
  discussion.messages.push(message);
  await discussion.save();

  res.send({
    status: "true",
    message: "Message added to discussion successfully",
    body: discussion,
  });
});

const deleteDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findByIdAndDelete(req.params.id);

  if (!discussion) {
    res.status(404).send({
      status: "false",
      message: "Discussion not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Discussion deleted successfully",
  });
});

module.exports = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  addMessageToDiscussion,
  deleteDiscussion,
};
