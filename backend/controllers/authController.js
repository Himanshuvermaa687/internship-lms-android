const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role: email === "admin@test.com" ? "admin" : "user"
});


    res.status(201).json({
      message: "User registered successfully",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 LOGIN (NEW – ADD THIS BELOW REGISTER)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
  {
    userId: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.profile = async (req, res) => {
  try {
    res.json({
      message: "Profile data fetched successfully",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

