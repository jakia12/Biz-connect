const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Load env vars from .env.local or .env
const envPath = path.resolve(__dirname, '../.env.local');
const envPathFallback = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else if (fs.existsSync(envPathFallback)) {
  require('dotenv').config({ path: envPathFallback });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env or .env.local');
  process.exit(1);
}

const userEmail = process.argv[2];
const newPassword = process.argv[3];

if (!userEmail || !newPassword) {
  console.error('Usage: node scripts/reset-password.js <email> <new_password>');
  process.exit(1);
}

if (newPassword.length < 6) {
    console.error('Error: Password must be at least 6 characters long');
    process.exit(1);
}

async function resetPassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define minimal schema
    const UserSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const user = await User.findOne({ email: userEmail.toLowerCase() });

    if (!user) {
      console.error(`User with email ${userEmail} not found.`);
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    
    // Hash the new password
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    console.log('Successfully updated password.');
    console.log('Update result:', result);

  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

resetPassword();
