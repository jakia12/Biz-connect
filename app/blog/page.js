/**
 * Blog Page
 * Latest news and articles
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: '10 Tips for Growing Your Small Business in Bangladesh',
      excerpt: 'Discover proven strategies to scale your SME and reach more customers in the digital age.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      category: 'Business Growth',
      date: 'Nov 20, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Build Trust with Online Customers',
      excerpt: 'Learn the essential elements of building credibility and trust in e-commerce.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop',
      category: 'Marketing',
      date: 'Nov 18, 2024',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'The Future of B2B Marketplaces in South Asia',
      excerpt: 'Explore emerging trends and opportunities in the B2B e-commerce landscape.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      category: 'Industry Insights',
      date: 'Nov 15, 2024',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Success Story: How Dhaka Crafts Scaled to 1000+ Orders',
      excerpt: 'A local handicraft business shares their journey to success on BizConnect.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
      category: 'Success Stories',
      date: 'Nov 12, 2024',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Digital Payment Solutions for SMEs',
      excerpt: 'A comprehensive guide to accepting online payments safely and efficiently.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
      category: 'Technology',
      date: 'Nov 10, 2024',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Packaging Tips for E-commerce Sellers',
      excerpt: 'Best practices for packaging products to ensure safe delivery and customer satisfaction.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
      category: 'Seller Tips',
      date: 'Nov 8, 2024',
      readTime: '4 min read'
    },
  ];

  const categories = ['All', 'Business Growth', 'Marketing', 'Industry Insights', 'Success Stories', 'Technology', 'Seller Tips'];

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
            BizConnect Blog
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Insights, tips, and stories to help your business thrive
          </motion.p>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        className="bg-white py-6 border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors whitespace-nowrap font-medium text-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Post */}
      <motion.section 
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto">
                <Image 
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{posts[0].title}</h2>
                <p className="text-gray-600 mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>{posts[0].date}</span>
                  <span>•</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <Link href={`/blog/${posts[0].id}`}>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Grid */}
      <motion.section 
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <motion.div 
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest business tips, success stories, and platform updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow">
              Subscribe
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
