/**
 * Returns & Refunds Page
 * Return policy and refund process
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function ReturnsPage() {
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
            Returns & Refunds
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your satisfaction is our priority
          </motion.p>
        </div>
      </motion.section>

      {/* Return Policy */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At BizConnect, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
                </p>
                <h3 className="font-bold text-gray-900 mt-6">Return Window</h3>
                <p>
                  You have <strong>7 days</strong> from the date of delivery to return most items. Some categories may have different return windows - please check the product page for specific details.
                </p>
                <h3 className="font-bold text-gray-900 mt-6">Eligible Items</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Items must be unused and in original packaging</li>
                  <li>All tags and labels must be attached</li>
                  <li>Items must not be damaged or altered</li>
                  <li>Original invoice must be included</li>
                </ul>
                <h3 className="font-bold text-gray-900 mt-6">Non-Returnable Items</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Perishable goods (food, flowers)</li>
                  <li>Custom or personalized items</li>
                  <li>Digital products and services</li>
                  <li>Intimate or sanitary goods</li>
                </ul>
              </div>
            </motion.div>

            {/* Return Process */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Return</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Request Return', desc: 'Go to "My Orders" and click "Return Item" on the order you want to return.' },
                  { step: 2, title: 'Select Reason', desc: 'Choose the reason for return and provide any additional details.' },
                  { step: 3, title: 'Get Approval', desc: 'Wait for seller approval (usually within 24 hours).' },
                  { step: 4, title: 'Ship Item', desc: 'Pack the item securely and ship it to the provided address.' },
                  { step: 5, title: 'Receive Refund', desc: 'Once the seller receives and inspects the item, your refund will be processed.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Refund Policy */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Policy</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="font-bold text-gray-900">Processing Time</h3>
                <p>
                  Refunds are processed within <strong>5-7 business days</strong> after we receive and inspect the returned item.
                </p>
                <h3 className="font-bold text-gray-900 mt-6">Refund Method</h3>
                <p>
                  Refunds will be issued to your original payment method:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Mobile wallets (bKash, Nagad): 1-3 business days</li>
                  <li>Credit/Debit cards: 5-10 business days</li>
                  <li>Bank transfer: 3-7 business days</li>
                </ul>
                <h3 className="font-bold text-gray-900 mt-6">Shipping Costs</h3>
                <p>
                  Return shipping costs are the buyer's responsibility unless the item is defective or incorrect.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Need Help */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-lg opacity-90 mb-8">Our customer support team is here to assist you</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Contact Support
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
