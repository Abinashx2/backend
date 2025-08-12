// routes/auth.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


dotenv.config();
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      console.log("Login attempt for:", username);
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        console.log("❌ User not found");
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("❌ Incorrect password");
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET is undefined");
        return res.status(500).json({ message: 'JWT_SECRET not set' });
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      console.log("✅ Login successful");
      res.json({ token });
    } catch (err) {
      console.error("🔥 Login error:", err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  export default router;