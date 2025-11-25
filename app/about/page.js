/**
 * About Us Page
 * Company information and mission
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 font-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About BizConnect
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Empowering Small Businesses in Bangladesh with a Trusted Marketplace
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
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
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                BizConnect was founded with a simple mission: to help small and medium enterprises (SMEs) in Bangladesh thrive in the digital economy.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We believe that every business, regardless of size, deserves access to the tools and marketplace they need to succeed. Our platform connects buyers with verified sellers, ensuring trust, quality, and growth for all.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From wholesale products to professional services, we're building an ecosystem where businesses can discover opportunities, build relationships, and scale sustainably.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Sellers" },
              { number: "50,000+", label: "Products & Services" },
              { number: "100,000+", label: "Happy Customers" },
              { number: "64", label: "Districts Covered" }
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

      {/* Values Section */}
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
              {
                icon: "🤝",
                title: "Trust & Transparency",
                description: "We verify every seller and ensure transparent transactions for peace of mind."
              },
              {
                icon: "🚀",
                title: "Growth & Innovation",
                description: "We continuously innovate to provide the best tools for business growth."
              },
              {
                icon: "💚",
                title: "Community First",
                description: "We prioritize the success and well-being of our business community."
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
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
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Ahmed Rahman", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
              { name: "Fatima Khan", role: "Head of Operations", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
              { name: "Karim Hossain", role: "CTO", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
              { name: "Nusrat Jahan", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
