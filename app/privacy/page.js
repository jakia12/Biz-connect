/**
 * Privacy Policy Page
 * Data privacy and protection policy
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your privacy is important to us
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <p className="text-gray-700 mb-8">
                <strong>Effective Date:</strong> November 25, 2024
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information to provide better services to our users. The types of information we collect include:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely by third parties)</li>
                <li>Business information for sellers</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Browsing history and search queries</li>
                <li>Device information and IP address</li>
                <li>Cookies and similar technologies</li>
                <li>Transaction history</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Processing orders and transactions</li>
                <li>Providing customer support</li>
                <li>Improving our platform and services</li>
                <li>Sending order updates and notifications</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Marketing and promotional communications (with your consent)</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Sellers:</strong> To fulfill your orders</li>
                <li><strong>Service Providers:</strong> Payment processors, shipping companies</li>
                <li><strong>Legal Authorities:</strong> When required by law</li>
                <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
              <p className="text-gray-700 mb-6">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings, but disabling them may affect functionality.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. You may request deletion of your account and data at any time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
              <p className="text-gray-700 mb-6">
                Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before providing any information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                BizConnect is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or want to exercise your rights, contact us at:
                <br /><br />
                <strong>Email:</strong> privacy@bizconnect.com<br />
                <strong>Phone:</strong> +880 16XXX-XXXXX<br />
                <strong>Address:</strong> Dhaka, Bangladesh
              </p>

            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
