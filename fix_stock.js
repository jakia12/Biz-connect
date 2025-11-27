
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple .env parser
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envFile.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });
    return envVars;
  } catch (error) {
    console.error('Error loading .env:', error);
    return {};
  }
}

const env = loadEnv();
const MONGODB_URI = env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env');
  process.exit(1);
}

const ProductSchema = new mongoose.Schema({
  title: String,
  stock: Number,
  status: String,
  price: Number
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function fixStock() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const product = await Product.findOne({ title: /Industrial sewing machine/i });
    
    if (product) {
      console.log('Product found:', product.title);
      console.log('Current Stock:', product.stock);
      
      product.stock = 100;
      product.status = 'active'; // Ensure status is active
      await product.save();
      
      console.log('Updated Stock to:', product.stock);
      console.log('Updated Status to:', product.status);
    } else {
      console.log('Product not found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

fixStock();
