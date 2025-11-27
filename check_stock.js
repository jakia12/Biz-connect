
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

async function checkStock() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const product = await Product.findOne({ title: /Industrial sewing machine/i });
    
    let output = '';
    if (product) {
      output += `Product found:\n`;
      output += `ID: ${product._id}\n`;
      output += `Title: ${product.title}\n`;
      output += `Stock: ${product.stock} (Type: ${typeof product.stock})\n`;
      output += `Status: ${product.status}\n`;
      output += `Price: ${product.price}\n`;
    } else {
      output += `Product not found\n`;
    }

    fs.writeFileSync('stock_check_result.txt', output);
    console.log('Result written to stock_check_result.txt');

  } catch (error) {
    console.error('Error:', error);
    fs.writeFileSync('stock_check_result.txt', 'Error: ' + error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkStock();
