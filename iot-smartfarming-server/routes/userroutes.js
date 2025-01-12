const express = require('express');
const User = require('../models/usermodel');
const Farm = require('../models/farmmodel'); 
const router = express.Router();

router.post('/', async (req, res) => {
  console.log("Creating a new user with data:", req.body);
  try {
    const { username, password, fullName, email, phoneNumber } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('User with this username or email already exists');
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    const newFarm = new Farm({
        name: `${fullName}'s Farm`,
        location: 'Unknown', 
        monitoringData: [], 
      });
      await newFarm.save();
      console.log("New farm created:", newFarm);

    const newUser = new User({
      userName,
      password,
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
    res.status(500).json({ error: 'Error creating user or farm' });
  }
});

module.exports = router;