/**
 * Community Page
 * BizConnect community and social impact
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CommunityPage() {
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
            BizConnect Cares
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Empowering communities and creating positive social impact across Bangladesh
          </motion.p>
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">Our Social Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At BizConnect, we believe in using business as a force for good. We're committed to creating opportunities for underserved communities and supporting sustainable economic growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through our platform, we've helped thousands of small businesses thrive, created jobs, and contributed to local economies across Bangladesh.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
                alt="Community"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Initiatives */}
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
            Our Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Seller Training',
                description: 'Free workshops and training programs to help sellers succeed online.'
              },
              {
                icon: '🌱',
                title: 'Sustainable Business',
                description: 'Supporting eco-friendly businesses and sustainable practices.'
              },
              {
                icon: '👥',
                title: 'Women Empowerment',
                description: 'Special programs to support women entrepreneurs.'
              },
            ].map((initiative, idx) => (
              <motion.div 
                key={idx}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-4">{initiative.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Stats */}
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
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Sellers Supported' },
              { number: '50,000+', label: 'Jobs Created' },
              { number: '₹10M+', label: 'Revenue Generated' },
              { number: '64', label: 'Districts Reached' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                variants={fadeInUp}
              >
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
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
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg opacity-90 mb-8">Be part of the movement to empower small businesses</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Get Involved
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
