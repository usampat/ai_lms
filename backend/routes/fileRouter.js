const express = require("express");
const multer = require("multer");
const path = require("path");
const fileRouter = express.Router();

const {
  uploadFile,
  getFile,
  deleteFile,
  getAllFiles,
} = require("../controllers/fileController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../db/files/"));
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

fileRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);
fileRouter.get("/all", authMiddleware, getAllFiles);
fileRouter.get("/:id", authMiddleware, getFile);
fileRouter.delete("/:id", authMiddleware, deleteFile);

module.exports = fileRouter;
