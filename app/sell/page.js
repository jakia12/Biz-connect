/**
 * Sell on BizConnect Page
 * Information for potential sellers
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-6 font-heading">Start Selling on BizConnect</h1>
              <p className="text-xl opacity-90 mb-8">
                Join 10,000+ successful sellers and grow your business with Bangladesh's leading B2B marketplace
              </p>
              <Link href="/seller/setup">
                <Button variant="outline" className="bg-white text-primary border-white hover:bg-gray-100">
                  Become a Seller →
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="relative h-96"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                alt="Sell on BizConnect"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits */}
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
            Why Sell on BizConnect?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Reach More Customers',
                description: 'Access to 100,000+ active buyers across Bangladesh looking for products and services.'
              },
              {
                icon: '💰',
                title: 'Low Fees',
                description: 'Only 5-10% commission on sales. No monthly fees or hidden charges.'
              },
              {
                icon: '🛡️',
                title: 'Secure Payments',
                description: 'Get paid safely and on time with our secure payment system and buyer protection.'
              },
              {
                icon: '📈',
                title: 'Grow Your Business',
                description: 'Access analytics, marketing tools, and insights to scale your business.'
              },
              {
                icon: '✅',
                title: 'Verified Badge',
                description: 'Build trust with customers through our seller verification program.'
              },
              {
                icon: '🎓',
                title: 'Free Training',
                description: 'Access seller resources, webinars, and support to succeed online.'
              },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow text-center"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
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
            How to Get Started
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your seller account in minutes with basic business information.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '2',
                title: 'Complete Verification',
                description: 'Submit business documents for verification to build trust with buyers.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '3',
                title: 'List Products',
                description: 'Add your products or services with photos, descriptions, and pricing.',
                color: 'from-green-500 to-teal-500'
              },
              {
                step: '4',
                title: 'Start Selling',
                description: 'Receive orders, fulfill them, and get paid directly to your account.',
                color: 'from-orange-500 to-red-500'
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="flex gap-6 items-start"
                variants={fadeInUp}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Success Stories */}
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
            Seller Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Dhaka Crafts',
                business: 'Handmade Products',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
                quote: 'BizConnect helped us reach customers nationwide. Our sales tripled in 6 months!',
                stats: '1000+ orders'
              },
              {
                name: 'Tech Solutions BD',
                business: 'IT Services',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
                quote: 'The platform is easy to use and the support team is amazing. Highly recommended!',
                stats: '500+ clients'
              },
            ].map((story, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={story.image} alt={story.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.business}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{story.quote}"</p>
                <p className="text-primary font-bold">{story.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            No monthly fees. No setup costs. Pay only when you make a sale.
          </p>
          <div className="max-w-md mx-auto bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-5xl font-bold mb-2">5-10%</h3>
            <p className="text-xl opacity-90 mb-6">Commission per sale</p>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No monthly fees
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No setup costs
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited listings
              </li>
            </ul>
            <Link href="/seller/setup">
              <button className="w-full bg-white text-primary px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
                Start Selling Now
              </button>
            </Link>
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
          <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl opacity-90 mb-8">Join BizConnect today and start reaching more customers</p>
          <Link href="/seller/setup">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow">
              Become a Seller →
            </button>
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
