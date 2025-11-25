/**
 * Digital Payments Page
 * Payment methods and information
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function PaymentsPage() {
  const paymentMethods = [
    {
      name: 'bKash',
      logo: '💳',
      description: 'Mobile wallet payment - instant and secure',
      features: ['Instant transfer', 'No hidden fees', '24/7 available'],
      popular: true
    },
    {
      name: 'Nagad',
      logo: '📱',
      description: 'Digital financial service for everyone',
      features: ['Fast processing', 'Cashback offers', 'Wide acceptance'],
      popular: true
    },
    {
      name: 'Rocket',
      logo: '🚀',
      description: 'Dutch-Bangla Bank mobile banking',
      features: ['Secure transactions', 'Low fees', 'Easy to use'],
      popular: false
    },
    {
      name: 'Credit/Debit Cards',
      logo: '💳',
      description: 'Visa, Mastercard, Amex accepted',
      features: ['International cards', 'EMI options', 'Secure 3D verification'],
      popular: true
    },
    {
      name: 'Bank Transfer',
      logo: '🏦',
      description: 'Direct bank account transfer',
      features: ['All major banks', 'Bulk payments', 'Invoice support'],
      popular: false
    },
    {
      name: 'Cash on Delivery',
      logo: '💵',
      description: 'Pay when you receive your order',
      features: ['No advance payment', 'Verify before paying', 'Limited areas'],
      popular: false
    },
  ];

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
            Digital Payment Solutions
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Safe, secure, and convenient payment options for your business
          </motion.p>
        </div>
      </motion.section>

      {/* Payment Methods */}
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
            Accepted Payment Methods
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paymentMethods.map((method, idx) => (
              <motion.div 
                key={idx}
                className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow relative ${
                  method.popular ? 'ring-2 ring-primary' : ''
                }`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                {method.popular && (
                  <div className="absolute -top-3 right-6 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                    Popular
                  </div>
                )}
                <div className="text-6xl mb-4">{method.logo}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Security Features */}
      <motion.section 
        className="bg-white py-16"
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
            Your Security is Our Priority
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🔒', title: 'SSL Encryption', desc: 'Bank-level security for all transactions' },
              { icon: '🛡️', title: 'Buyer Protection', desc: 'Money-back guarantee on eligible orders' },
              { icon: '✅', title: 'Verified Sellers', desc: 'All sellers are verified and trusted' },
              { icon: '🔐', title: 'Secure Checkout', desc: 'PCI DSS compliant payment processing' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
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
            How Payment Works
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { step: '1', title: 'Place Order', desc: 'Select products and proceed to checkout' },
              { step: '2', title: 'Choose Payment', desc: 'Select your preferred payment method' },
              { step: '3', title: 'Secure Payment', desc: 'Complete payment through secure gateway' },
              { step: '4', title: 'Order Confirmed', desc: 'Receive instant confirmation and tracking' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="flex gap-6 items-start"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section 
        className="bg-white py-16"
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
            Payment FAQs
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Are my payment details secure?', a: 'Yes! We use industry-standard SSL encryption and never store your card details.' },
              { q: 'Can I get a refund?', a: 'Yes, refunds are processed within 5-7 business days to your original payment method.' },
              { q: 'Do you charge any fees?', a: 'No hidden fees! You only pay the product price and any applicable shipping charges.' },
              { q: 'Which cards are accepted?', a: 'We accept Visa, Mastercard, and American Express credit and debit cards.' },
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-gray-50 rounded-xl p-6"
                variants={fadeInUp}
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
