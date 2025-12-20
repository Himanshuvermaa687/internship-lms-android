const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const Course = require("../models/Course");
const { getAllEnrollments } = require("../controllers/adminController");

router.get(
  "/enrollments",
  authMiddleware,
  adminMiddleware,
  getAllEnrollments
);


// CREATE COURSE (ADMIN)
router.post(
  "/courses",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { title, description, instructor } = req.body;

      const course = await Course.create({
        title,
        description,
        instructor,
      });

      res.status(201).json({
        message: "Course created successfully",
        course,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
