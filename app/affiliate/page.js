/**
 * Affiliate Program Page
 * Join and earn with BizConnect
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero */}
      <motion.section 
        className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl font-bold mb-6 font-heading">Earn with BizConnect</h1>
              <p className="text-2xl opacity-90 mb-8">
                Join our affiliate program and earn up to <span className="text-yellow-300 font-bold">15% commission</span> on every sale
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-shadow">
                Join Now - It's Free!
              </button>
            </motion.div>
            <motion.div
              className="relative h-96"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Affiliate Program"
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
            className="text-4xl font-bold text-center text-gray-900 mb-12 font-heading"
            variants={fadeInUp}
          >
            Why Join Our Affiliate Program?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'High Commission Rates',
                description: 'Earn 10-15% commission on every sale you refer',
                highlight: 'Up to 15%'
              },
              {
                icon: '🚀',
                title: 'Fast Payouts',
                description: 'Get paid monthly via bank transfer or mobile wallet',
                highlight: 'Monthly'
              },
              {
                icon: '📊',
                title: 'Real-Time Tracking',
                description: 'Monitor your earnings and performance with our dashboard',
                highlight: 'Live Stats'
              },
              {
                icon: '🎯',
                title: 'Marketing Materials',
                description: 'Access banners, links, and promotional content',
                highlight: 'Free Tools'
              },
              {
                icon: '🏆',
                title: 'Performance Bonuses',
                description: 'Top affiliates earn extra rewards and incentives',
                highlight: 'Extra Rewards'
              },
              {
                icon: '🤝',
                title: 'Dedicated Support',
                description: 'Get help from our affiliate success team',
                highlight: '24/7 Support'
              },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all relative overflow-hidden group"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl text-xs font-bold">
                  {benefit.highlight}
                </div>
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
            className="text-4xl font-bold text-center text-gray-900 mb-12 font-heading"
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Sign Up', desc: 'Create your free affiliate account', icon: '📝' },
                { step: '2', title: 'Get Links', desc: 'Access your unique referral links', icon: '🔗' },
                { step: '3', title: 'Promote', desc: 'Share links on your platforms', icon: '📢' },
                { step: '4', title: 'Earn', desc: 'Get paid for every sale', icon: '💵' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center relative"
                  variants={fadeInUp}
                >
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/20"></div>
                  )}
                  <div className="text-6xl mb-4 relative z-10">{item.icon}</div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Commission Structure */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-900 mb-12 font-heading"
            variants={fadeInUp}
          >
            Commission Structure
          </motion.h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Starter', sales: '0-10 sales/month', rate: '10%', color: 'from-gray-400 to-gray-600' },
              { tier: 'Pro', sales: '11-50 sales/month', rate: '12%', color: 'from-blue-400 to-blue-600', popular: true },
              { tier: 'Elite', sales: '50+ sales/month', rate: '15%', color: 'from-yellow-400 to-orange-500' },
            ].map((tier, idx) => (
              <motion.div 
                key={idx}
                className={`bg-gradient-to-br ${tier.color} text-white rounded-2xl p-8 text-center relative ${
                  tier.popular ? 'ring-4 ring-primary scale-105' : ''
                }`}
                variants={fadeInUp}
                whileHover={{ scale: tier.popular ? 1.05 : 1.08 }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                <p className="text-sm opacity-90 mb-6">{tier.sales}</p>
                <div className="text-5xl font-bold mb-2">{tier.rate}</div>
                <p className="text-sm opacity-90">Commission Rate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Success Stories */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-900 mb-12 font-heading"
            variants={fadeInUp}
          >
            Affiliate Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rakib Hassan', earnings: '৳50,000/month', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', quote: 'BizConnect affiliate program changed my life!' },
              { name: 'Nusrat Jahan', earnings: '৳35,000/month', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop', quote: 'Easy to promote and great commission rates!' },
              { name: 'Karim Ahmed', earnings: '৳45,000/month', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', quote: 'Best affiliate program in Bangladesh!' },
            ].map((story, idx) => (
              <motion.div 
                key={idx}
                className="bg-gray-50 rounded-2xl p-8 text-center"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{story.name}</h3>
                <p className="text-primary font-bold text-xl mb-3">{story.earnings}</p>
                <p className="text-gray-600 italic">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-2xl opacity-90 mb-10">Join thousands of successful affiliates today</p>
          <button className="bg-white text-primary px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-shadow">
            Join Affiliate Program →
          </button>
          <p className="text-sm opacity-75 mt-6">No credit card required • Free to join • Cancel anytime</p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
