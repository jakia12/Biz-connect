/**
 * Help Center Page
 * FAQ and support resources
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'sellers', name: 'For Sellers', icon: '🏪' },
  ];

  const faqs = {
    general: [
      { q: 'What is BizConnect?', a: 'BizConnect is Bangladesh\'s leading B2B marketplace connecting small businesses with verified sellers for wholesale products and professional services.' },
      { q: 'How do I create an account?', a: 'Click on "Sign Up" in the top right corner, choose your account type (Buyer or Seller), and fill in your details.' },
      { q: 'Is BizConnect free to use?', a: 'Yes! Creating an account and browsing is completely free. Sellers pay a small commission only on successful sales.' },
    ],
    orders: [
      { q: 'How do I place an order?', a: 'Browse products, add items to cart, proceed to checkout, and complete payment. You\'ll receive order confirmation via email.' },
      { q: 'Can I track my order?', a: 'Yes! Go to "My Orders" in your dashboard to track all your orders in real-time.' },
      { q: 'What if I want to cancel my order?', a: 'You can cancel orders before they are shipped. Go to order details and click "Cancel Order".' },
    ],
    payments: [
      { q: 'What payment methods do you accept?', a: 'We accept bKash, Nagad, Rocket, credit/debit cards, and bank transfers.' },
      { q: 'Is my payment information secure?', a: 'Absolutely! We use industry-standard encryption and never store your card details.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days to your original payment method.' },
    ],
    sellers: [
      { q: 'How do I become a seller?', a: 'Click "Join as Seller", complete the registration, verify your business, and start listing products!' },
      { q: 'What are the seller fees?', a: 'We charge a small commission (5-10%) only on successful sales. No monthly fees!' },
      { q: 'How do I get paid?', a: 'Payments are transferred to your bank account or mobile wallet within 3-5 days after order completion.' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-4 font-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            How Can We Help You?
          </motion.h1>
          <motion.div 
            className="max-w-2xl mx-auto mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full px-6 py-4 rounded-lg text-gray-900 outline-none"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section 
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '📞', title: 'Call Us', desc: '+880 16XXX-XXXXX' },
              { icon: '✉️', title: 'Email Support', desc: 'support@bizconnect.com' },
              { icon: '💬', title: 'Live Chat', desc: 'Chat with us now' },
              { icon: '📚', title: 'Documentation', desc: 'Browse guides' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12 font-heading"
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <motion.div 
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
          >
            {faqs[activeCategory].map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={fadeInUp}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 text-primary transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === idx ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Still Need Help */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg opacity-90 mb-8">Our support team is here for you 24/7</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Contact Support
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
