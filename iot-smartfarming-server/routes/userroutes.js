const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Farm = require('../models/farmmodel'); 
const router = express.Router();

router.post('/newUser', async (req, res) => {
  console.log("Creating a new user with data:", req.body);
  try {
    const { userName, password, fullName, email, phoneNumber , name , location} = req.body;

    if (!userName || !password || !fullName || !email || !phoneNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      console.error('User with this username or email already exists');
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFarm = new Farm({
      name ,
      location ,
      monitoringData: [],
    });
    await newFarm.save();
    console.log("New farm created:", newFarm);

    const newUser = new User({
      userName,
      password: hashedPassword,
      fullName,
      email,
      phoneNumber,
      farmId: newFarm._id,
    });
    console.log("New user data before saving:", newUser);
    await newUser.save();

    res.status(201).json({ message: 'User and farm created successfully', user: newUser, farm: newFarm });
  } catch (err) {
    console.error('Error creating user or farm:', err);
    res.status(500).json({ error: `Error creating user or farm: ${err.message}` });
  }
});

module.exports = router;
