// Temporary fix script - adds toast import and fixes registration functions
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'register', 'page.js');
let content = fs.readFileSync(filePath, 'utf8');

// Add toast import after react-hook-form import
content = content.replace(
  "import { useForm } from 'react-hook-form';",
  "import { useForm } from 'react-hook-form';\nimport toast, { Toaster } from 'react-hot-toast';"
);

// Replace onBuyerSubmit function
const buyerSubmitOld = `  const onBuyerSubmit = (data) => {
    console.log('Buyer Registration:', data);
    // Handle registration logic here
  };`;

const buyerSubmitNew = `  const onBuyerSubmit = async (data) => {
    try {
      console.log('[Frontend] Submitting buyer registration');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'buyer', ...data }),
      });
      const result = await response.json();
      console.log('[Frontend] Response:', result);
      if (!response.ok) throw new Error(result.error || 'Registration failed');
      toast.success('Account created! Redirecting...');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (error) {
      console.error('[Frontend] Error:', error);
      toast.error(error.message || 'Registration failed');
    }
  };`;

content = content.replace(buyerSubmitOld, buyerSubmitNew);

// Replace onSellerSubmit function
const sellerSubmitOld = `  const onSellerSubmit = (data) => {
    console.log('Seller Registration:', data);
    // Handle registration logic here
  };`;

const sellerSubmitNew = `  const onSellerSubmit = async (data) => {
    try {
      console.log('[Frontend] Submitting seller registration');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'seller', ...data }),
      });
      const result = await response.json();
      console.log('[Frontend] Response:', result);
      if (!response.ok) throw new Error(result.error || 'Registration failed');
      toast.success('Seller account created! Redirecting...');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (error) {
      console.error('[Frontend] Error:', error);
      toast.error(error.message || 'Registration failed');
    }
  };`;

content = content.replace(sellerSubmitOld, sellerSubmitNew);

// Add Toaster component after opening div
content = content.replace(
  '<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-body flex items-center justify-center py-12 px-4">',
  `<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-body flex items-center justify-center py-12 px-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#fff', color: '#333', padding: '16px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }, success: { iconTheme: { primary: '#10b981', secondary: '#fff' } }, error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } } }} />`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Registration page fixed successfully!');
