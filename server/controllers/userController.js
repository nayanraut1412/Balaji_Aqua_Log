const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a user
exports.createUser = async (req, res) => {
  const { password, ...userData } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating mentor', error: error.message });
  }
};


// login.js
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during login', error: error.message });
  }
};

// Add route in routes/user.js
// router.post('/login', loginUser);
