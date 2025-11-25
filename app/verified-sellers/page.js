/**
 * Verified Sellers Page
 * Browse verified and trusted sellers
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifiedSellersPage() {
  const sellers = [
    {
      id: 1,
      name: 'Creative Studio BD',
      category: 'Graphics & Design',
      rating: 4.9,
      reviews: 245,
      orders: 1200,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 2,
      name: 'Tech Pro BD',
      category: 'Web Development',
      rating: 5.0,
      reviews: 189,
      orders: 850,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 3,
      name: 'Garments Direct',
      category: 'Fashion & Apparel',
      rating: 4.8,
      reviews: 567,
      orders: 2100,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 4,
      name: 'Eco Crafts BD',
      category: 'Handmade Crafts',
      rating: 4.9,
      reviews: 423,
      orders: 1500,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=300&fit=crop',
      verified: true
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
            Verified Sellers
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Shop with confidence from our trusted and verified business partners
          </motion.p>
        </div>
      </motion.section>

      {/* Verification Benefits */}
      <motion.section 
        className="bg-white py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'Identity Verified', desc: 'All documents checked' },
              { icon: '🏢', title: 'Business Verified', desc: 'Legitimate businesses' },
              { icon: '⭐', title: 'Quality Assured', desc: 'High ratings maintained' },
              { icon: '🛡️', title: 'Buyer Protection', desc: 'Safe transactions' },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-4"
                variants={fadeInUp}
              >
                <div className="text-4xl mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sellers Grid */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellers.map((seller) => (
              <motion.div 
                key={seller.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Link href={`/seller/${seller.id}`}>
                  <div className="relative h-48">
                    <Image 
                      src={seller.image}
                      alt={seller.name}
                      fill
                      className="object-cover"
                    />
                    {seller.verified && (
                      <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{seller.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{seller.category}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-bold text-gray-900">{seller.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({seller.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">{seller.orders.toLocaleString()} orders completed</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Become Verified CTA */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Become a Verified Seller?</h2>
          <p className="text-lg opacity-90 mb-8">Build trust and grow your business faster</p>
          <Link href="/seller/setup">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
              Apply for Verification
            </button>
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
