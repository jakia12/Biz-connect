const fs = require('fs');

const filePath = './components/layout/DashboardLayout.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the Reviews menu item and add Verification after it
const reviewsItem = `    { 
      icon: '⭐', 
      label: 'Reviews', 
      href: '/dashboard/seller/reviews',
      path: '/dashboard/seller/reviews'
    },`;

const verificationItem = `    { 
      icon: '⭐', 
      label: 'Reviews', 
      href: '/dashboard/seller/reviews',
      path: '/dashboard/seller/reviews'
    },
    { 
      icon: '✅', 
      label: 'Verification', 
      href: '/dashboard/seller/verification',
      path: '/dashboard/seller/verification'
    },`;

content = content.replace(reviewsItem, verificationItem);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Verification menu item added successfully!');
