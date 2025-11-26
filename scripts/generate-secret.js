/**
 * Generate a secure random secret for NEXTAUTH_SECRET
 * Run with: node scripts/generate-secret.js
 */

const crypto = require('crypto');

// Generate a secure random secret
const secret = crypto.randomBytes(32).toString('base64');

console.log('\n==============================================');
console.log('🔐 Generated NEXTAUTH_SECRET:');
console.log('==============================================\n');
console.log(secret);
console.log('\n==============================================');
console.log('📋 Copy the above string and add it to your .env file:');
console.log('==============================================\n');
console.log('NEXTAUTH_SECRET=' + secret);
console.log('\n');
