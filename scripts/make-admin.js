const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

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

if (!userEmail) {
  console.error('Usage: node scripts/make-admin.js <email>');
  process.exit(1);
}

async function makeAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define minimal schema to avoid validation issues if the app schema changes
    // We only need to update the role
    const UserSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const user = await User.findOne({ email: userEmail.toLowerCase() });

    if (!user) {
      console.error(`User with email ${userEmail} not found.`);
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    console.log(`Current Role: ${user.role}`);

    if (user.role === 'admin') {
      console.log('User is already an admin.');
    } else {
      const result = await User.updateOne(
        { _id: user._id },
        { $set: { role: 'admin' } }
      );
      console.log('Successfully updated user role to ADMIN.');
      console.log('Update result:', result);
    }

  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

makeAdmin();
