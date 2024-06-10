const Announcement = require("../models/announcementModel");
const asyncHandler = require("express-async-handler");

// Create a new announcement
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;

  const announcement = new Announcement({
    title,
    content,
    author,
  });
  await announcement.save();

  res.send({
    status: "true",
    message: "New announcement created",
    body: announcement,
  });
});

// Get all announcements
const getAllAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find().populate(
    "author",
    "username"
  );

  res.send({
    status: "true",
    message: "All announcements fetched successfully",
    body: announcements,
  });
});

// Get an announcement by ID
const getAnnouncementById = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!announcement) {
    res.status(404).send({
      status: "false",
      message: "Announcement not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Announcement found successfully",
    body: announcement,
  });
});

// Update an announcement by ID
const updateAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!announcement) {
    res.status(404).send({
      status: "false",
      message: "Announcement not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Announcement updated successfully",
    body: announcement,
  });
});

// Delete an announcement by ID
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement) {
    res.status(404).send({
      status: "false",
      message: "Announcement not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Announcement deleted successfully",
  });
});

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
