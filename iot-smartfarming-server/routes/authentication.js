const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); 
const Farm = require('../models/farmmodel'); 

const router = express.Router();

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  console.log("Login attempt:", { userName });

  // Validation for required fields
  if (!userName || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  try {
    const user = await User.findOne({ userName }).populate('farmId'); 
    if (!user) {
      console.error('User not found with the provided username');
      return res.status(400).json({ message: 'Invalid username.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch for user:', userName);
      return res.status(400).json({ message: 'Invalid password.' });
    }

  
    const token = jwt.sign(
      { userId: user._id, farmId: user.farmId }, 
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log("Token created for user:", userName);

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        farmId: user.farmId,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
