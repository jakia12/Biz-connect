/**
 * How to Buy Page
 * Step-by-step buying guide
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function HowToBuyPage() {
  const steps = [
    {
      number: '01',
      title: 'Create an Account',
      description: 'Sign up for free as a buyer. Provide your basic information and verify your email address.',
      icon: '👤',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Browse Products',
      description: 'Explore thousands of products and services. Use filters and search to find exactly what you need.',
      icon: '🔍',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Add to Cart',
      description: 'Select your desired items, choose quantity, and add them to your shopping cart.',
      icon: '🛒',
      color: 'from-green-500 to-teal-500'
    },
    {
      number: '04',
      title: 'Checkout',
      description: 'Review your order, enter shipping details, and choose your preferred payment method.',
      icon: '💳',
      color: 'from-orange-500 to-red-500'
    },
    {
      number: '05',
      title: 'Make Payment',
      description: 'Complete secure payment using bKash, Nagad, cards, or bank transfer.',
      icon: '✅',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      number: '06',
      title: 'Track Order',
      description: 'Monitor your order status in real-time from your dashboard until delivery.',
      icon: '📦',
      color: 'from-pink-500 to-rose-500'
    },
  ];

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
            How to Buy on BizConnect
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Follow these simple steps to start purchasing from verified sellers
          </motion.p>
        </div>
      </motion.section>

      {/* Steps */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="flex flex-col md:flex-row items-center gap-8"
                variants={fadeInUp}
              >
                <motion.div 
                  className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-4xl flex-shrink-0 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.icon}
                </motion.div>
                <div className="flex-1 bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-gray-200">{step.number}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tips */}
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
            Pro Tips for Buyers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⭐', title: 'Check Seller Ratings', desc: 'Always review seller ratings and customer feedback before purchasing.' },
              { icon: '💬', title: 'Message Sellers', desc: 'Don\'t hesitate to ask questions about products before buying.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Use our secure payment system for buyer protection.' },
            ].map((tip, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{tip.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg opacity-90 mb-8">Join thousands of happy buyers on BizConnect</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Browse Products
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
