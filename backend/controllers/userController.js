const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// POST /api/user/enroll
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const exists = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/user/enrollments
exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.userId,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
