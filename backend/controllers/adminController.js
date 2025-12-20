const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const Enrollment = require("../models/Enrollment");

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("user", "name email")
      .populate("course", "title");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


