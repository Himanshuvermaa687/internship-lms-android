const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  enrollCourse,
  getEnrollments,
} = require("../controllers/userController");

router.post("/enroll", authMiddleware, enrollCourse);
router.get("/enrollments", authMiddleware, getEnrollments);

module.exports = router;
