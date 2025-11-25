/**
 * Code of Conduct Page
 * Community guidelines and seller standards
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 font-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Code of Conduct
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Building a trustworthy marketplace together
          </motion.p>
        </div>
      </motion.section>

      {/* Core Values */}
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
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🤝', title: 'Trust & Integrity', desc: 'We build relationships based on honesty and transparency' },
              { icon: '⭐', title: 'Quality First', desc: 'We maintain high standards for products and services' },
              { icon: '🌟', title: 'Respect & Fairness', desc: 'We treat everyone with dignity and fairness' },
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Seller Guidelines */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Seller Guidelines</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Do's</h3>
                <ul className="space-y-3">
                  {[
                    'Provide accurate product descriptions and images',
                    'Ship orders within the promised timeframe',
                    'Respond to customer inquiries within 24 hours',
                    'Honor all confirmed orders and commitments',
                    'Maintain professional communication',
                    'Resolve disputes fairly and promptly',
                    'Keep your inventory updated',
                    'Provide quality products/services as advertised',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">❌ Don'ts</h3>
                <ul className="space-y-3">
                  {[
                    'Sell counterfeit or illegal products',
                    'Manipulate prices or engage in price gouging',
                    'Create fake reviews or ratings',
                    'Harass or abuse customers',
                    'Share false or misleading information',
                    'Cancel orders without valid reasons',
                    'Spam customers with unsolicited messages',
                    'Violate intellectual property rights',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Buyer Guidelines */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Buyer Guidelines</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-md">
              <ul className="space-y-4">
                {[
                  { title: 'Read Product Descriptions', desc: 'Carefully review product details before purchasing' },
                  { title: 'Communicate Clearly', desc: 'Ask questions if you need clarification' },
                  { title: 'Make Timely Payments', desc: 'Complete payment promptly after placing orders' },
                  { title: 'Provide Accurate Information', desc: 'Ensure shipping and contact details are correct' },
                  { title: 'Leave Honest Reviews', desc: 'Share genuine feedback to help other buyers' },
                  { title: 'Report Issues', desc: 'Contact support if you encounter problems' },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Consequences */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Violation Consequences</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Violations of our Code of Conduct may result in:
              </p>
              <ul className="space-y-3">
                {[
                  'Warning and account review',
                  'Temporary account suspension',
                  'Permanent account termination',
                  'Removal of listings or content',
                  'Loss of seller privileges',
                  'Legal action in severe cases',
                ].map((consequence, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Code of Conduct?</h2>
          <p className="text-lg opacity-90 mb-8">Our support team is here to help</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Contact Support
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
