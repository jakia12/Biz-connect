  image: String,
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
  },
  emailVerified: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@bizconnect.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@bizconnect.com');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123456', salt);

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@bizconnect.com',
      password: hashedPassword,
      phone: '01700000000',
      role: 'admin',
      emailVerified: new Date(),
    });

    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@bizconnect.com');
    console.log('Password: admin123456');
    console.log('Role: admin');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

createAdminUser();
