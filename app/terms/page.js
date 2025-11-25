/**
 * Terms & Conditions Page
 * Legal terms and conditions
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp } from '@/utils/animations';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
            Terms & Conditions
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Last updated: November 25, 2024
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
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using BizConnect ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms & Conditions, please do not use the Platform.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of the Platform</h2>
              <p className="text-gray-700 mb-4">
                BizConnect provides a marketplace platform connecting buyers and sellers of products and services. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the Platform for illegal purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent activities</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-6">
                You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. BizConnect will not be liable for any loss or damage arising from your failure to protect your account information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seller Obligations</h2>
              <p className="text-gray-700 mb-4">
                If you are a seller on the Platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate product/service descriptions</li>
                <li>Honor all confirmed orders</li>
                <li>Ship products within the specified timeframe</li>
                <li>Provide quality products/services as described</li>
                <li>Respond to customer inquiries promptly</li>
                <li>Comply with all applicable business regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Buyer Obligations</h2>
              <p className="text-gray-700 mb-4">
                If you are a buyer on the Platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate shipping and contact information</li>
                <li>Make timely payments for orders</li>
                <li>Review products/services honestly</li>
                <li>Contact sellers for issues before leaving negative reviews</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments and Fees</h2>
              <p className="text-gray-700 mb-6">
                BizConnect charges sellers a commission on successful sales. All fees are clearly stated before listing. Payments are processed securely through our payment partners. We are not responsible for payment processing delays by third-party providers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                All content on BizConnect, including logos, text, graphics, and software, is the property of BizConnect or its licensors. You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Sell counterfeit or illegal products</li>
                <li>Engage in price manipulation</li>
                <li>Harass other users</li>
                <li>Spam or send unsolicited messages</li>
                <li>Attempt to hack or disrupt the Platform</li>
                <li>Create multiple accounts to manipulate ratings</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <p className="text-gray-700 mb-6">
                In case of disputes between buyers and sellers, BizConnect will attempt to mediate. However, we are not responsible for resolving all disputes. Users are encouraged to communicate directly to resolve issues.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                BizConnect is a marketplace platform. We do not manufacture, store, or inspect products. We are not liable for product quality, delivery delays, or disputes between buyers and sellers. Our liability is limited to the fees paid to us.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to suspend or terminate accounts that violate these Terms & Conditions. You may close your account at any time by contacting support.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We may update these Terms & Conditions from time to time. Continued use of the Platform after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about these Terms & Conditions, please contact us at:
                <br /><br />
                <strong>Email:</strong> legal@bizconnect.com<br />
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
