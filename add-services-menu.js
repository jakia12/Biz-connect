// Quick fix: Add "My Services" menu item to seller dashboard
// This script modifies DashboardLayout.jsx to include the My Services menu

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'layout', 'DashboardLayout.jsx');

let content = fs.readFileSync(filePath, 'utf8');

// Find the seller menu items array and add My Services after My Products
const myProductsItem = `    {
      icon: '📦',
      label: 'My Products',
      href: '/dashboard/seller/products',
      path: '/dashboard/seller/products'
    },`;

const myServicesItem = `    {
      icon: '💼',
      label: 'My Services',
      href: '/dashboard/seller/services',
      path: '/dashboard/seller/services'
    },`;

// Check if My Services already exists
if (content.includes("label: 'My Services'")) {
  console.log('✅ My Services menu item already exists!');
  process.exit(0);
}

// Add My Services after My Products
content = content.replace(myProductsItem, myProductsItem + '\n' + myServicesItem);

fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Successfully added "My Services" menu item to seller dashboard!');
console.log('📝 The menu will now show:');
console.log('   - Dashboard');
console.log('   - My Products');
console.log('   - My Services  ← NEW!');
console.log('   - Manage Orders');
console.log('   - Reviews');
console.log('   - Messages');
console.log('   - Analytics');
console.log('   - Settings');
