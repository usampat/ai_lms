const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");

const File = require("../models/fileModel");

// Upload a file
const uploadFile = asyncHandler(async (req, res) => {
  const file = req.file;
  const user = req.user._id;

  if (!file) {
    res.status(400).send({
      status: "false",
      message: "No file uploaded",
    });
    return;
  }

  const newFile = new File({
    filename: file.filename,
    path: file.path,
    filetype: file.mimetype,
    size: file.size,
    user: user,
  });

  await newFile.save();

  res.send({
    status: "true",
    message: "File uploaded successfully",
    body: newFile,
  });
});

// Get all files
const getAllFiles = asyncHandler(async (req, res) => {
  const files = await File.find().populate("user", "username");
  res.send({
    status: "true",
    message: "All files fetched successfully",
    body: files,
  });
});

// Get a file
const getFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || (req.user.role != "admin" && !file.user.equals(req.user._id))) {
    res.status(404).send({
      status: "false",
      message: "File not found",
    });
    return;
  }

  res.download(file.path, file.filename);
});

// Delete a file
const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || (req.user.role != "admin" && !file.user.equals(req.user._id))) {
    res.status(404).send({
      status: "false",
      message: "File not found",
    });
    return;
  }

  fs.unlink(file.path, async (err) => {
    if (err) {
      res.status(500).send({
        status: "false",
        message: "File could not be deleted",
      });
      return;
    }

    await File.deleteOne({ _id: req.params.id });

    res.send({
      status: "true",
      message: "File deleted successfully",
    });
  });
});

module.exports = {
  uploadFile,
  getAllFiles,
  getFile,
  deleteFile,
};
