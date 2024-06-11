const expresss = require("express");
const courseRouter = expresss.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourseDetails,
  addStudentToCourse,
} = require("../controllers/courseController");
const { onlyAllow, authMiddleware } = require("../middlewares/authMiddleware");

courseRouter.post(
  "/add",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  createCourse
);

courseRouter.get(
  "/all",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getAllCourses
);

courseRouter.get(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getCourseById
);

courseRouter.put(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  updateCourseDetails
);

courseRouter.delete(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  deleteCourse
);

courseRouter.post(
  "/:id/add-student",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  addStudentToCourse
);

module.exports = courseRouter;
