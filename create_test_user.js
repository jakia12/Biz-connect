const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://doadmin:485691c7R0hA2Jil@db-mongodb-sgp1-26705-c5016592.mongo.ondigitalocean.com/biz-connect?tls=true&authSource=admin&replicaSet=db-mongodb-sgp1-26705";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: true },
  role: { type: String, default: 'buyer' },
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const email = 'testbuyer@example.com';
    const password = 'Password123!';

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists. Updating password...');
      existingUser.password = password;
      await existingUser.save();
      console.log('User password updated.');
    } else {
      console.log('Creating new user...');
      await User.create({
        name: 'Test Buyer',
        email,
        password,
        role: 'buyer',
        phone: '01234567890',
      });
      console.log('User created successfully.');
    }

    console.log(`Credentials: ${email} / ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestUser();
