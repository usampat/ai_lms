const express = require("express");
const announcementRouter = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");
const { authMiddleware, onlyAllow } = require("../middlewares/authMiddleware");

announcementRouter.post(
  "/add",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  createAnnouncement
);
announcementRouter.get(
  "/all",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getAllAnnouncements
);
announcementRouter.get("/:id", authMiddleware, getAnnouncementById);
announcementRouter.put(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  updateAnnouncement
);
announcementRouter.delete(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  deleteAnnouncement
);

module.exports = announcementRouter;
