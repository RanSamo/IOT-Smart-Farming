const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Farm = require("../models/farmmodel");
const router = express.Router();

router.post("/newUser", async (req, res) => {
  console.log("Creating a new user with data:", req.body);
  try {
    const { userName, password, fullName, email, phoneNumber, name, location } =
      req.body;

    if (!userName || !password || !fullName || !email || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      console.error("User with this username or email already exists");
      return res
        .status(400)
        .json({ error: "User with this username or email already exists" });
    }

   // const hashedPassword = await bcrypt.hash(password, 10);

    const newFarm = new Farm({
      name,
      location,
      monitoringData: [],
    });
    await newFarm.save();
    console.log("New farm created:", newFarm);

    const newUser = new User({
      userName,
      password,// hashedPassword
      fullName,
      email,
      phoneNumber,
      farmId: newFarm._id,
    });
    console.log("New user data before saving:", newUser);
    await newUser.save();

    res.status(201).json({
      message: "User and farm created successfully",
      user: newUser,
      farm: newFarm,
    });
  } catch (err) {
    console.error("Error creating user or farm:", err);
    res
      .status(500)
      .json({ error: `Error creating user or farm: ${err.message}` });
  }
});

// Authenticate middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Add userId to the request
    req.role = decoded.role; // Optional: Add role if included in JWT
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

/*
// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }*/

      router.post("/login", async (req, res) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "email and password are required." });
        }
      
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
          }
      
          
          if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password." });
          }
      

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include user ID and optional role
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ token, message: "Login successful." });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Example: Protected route
router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "This is a protected route.",
    userId: req.userId,
    role: req.role,
  });
});

module.exports = router;
