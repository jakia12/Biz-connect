import mongoose from 'mongoose';
import connectDB from './backend/shared/config/database.js';

async function checkServices() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Define minimal Service schema
    const serviceSchema = new mongoose.Schema({
      title: String,
      status: String,
      sellerId: mongoose.Schema.Types.ObjectId,
      category: String
    }, { strict: false });
    
    const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

    const services = await Service.find({});
    console.log(`\nFound ${services.length} total services in database:\n`);
    services.forEach(s => {
      console.log(`- ID: ${s._id}`);
      console.log(`  Title: "${s.title}"`);
      console.log(`  Status: "${s.status}"`);
      console.log(`  Category: "${s.category}"`);
      console.log(`  Seller: ${s.sellerId}\n`);
    });

    const activeServices = await Service.find({ status: 'active' });
    console.log(`\n${activeServices.length} services have status "active" (these will show on the site)\n`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

checkServices();
