import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Abinash:Abdai6000@cluster0.vg2ewep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(async () => {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('Abdai6000#8133', 10);
    await User.create({ username: 'Abinashx1', password: hashedPassword });
    console.log('✅ Admin created');
    process.exit();
  })
  .catch(err => {
    console.error('❌ DB connection error:', err.message);
    process.exit();
  });
