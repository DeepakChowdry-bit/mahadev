// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ username, password: hashedPassword });
//     res.redirect('/dashboard.html');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error registering user');
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/login.html');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.redirect('/login.html');
    }
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
