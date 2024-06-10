const express = require("express");
const announcementRouter = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

announcementRouter.post("/", createAnnouncement);
announcementRouter.get("/", getAllAnnouncements);
announcementRouter.get("/:id", getAnnouncementById);
announcementRouter.put("/:id", updateAnnouncement);
announcementRouter.delete("/:id", deleteAnnouncement);

module.exports = announcementRouter;
