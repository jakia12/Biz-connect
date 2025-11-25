/**
 * Footer - Marketplace Style
 * Dense, Information-Rich, Multi-Column
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 font-body text-sm">
      <div className="container mx-auto px-4">
        
        {/* Top Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100 pb-10 mb-10">
          {[
            { title: "Great Value", sub: "Competitive prices on 100M+ items", icon: "💎" },
            { title: "Worldwide Delivery", sub: "Shipping to 200+ countries", icon: "🚚" },
            { title: "Safe Payment", sub: "Pay with popular & secure methods", icon: "🛡️" },
            { title: "24/7 Help Center", sub: "Round-the-clock assistance", icon: "🎧" },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <span className="text-3xl">{feat.icon}</span>
              <div>
                <h4 className="font-bold text-gray-800">{feat.title}</h4>
                <p className="text-xs text-gray-500">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Customer Care</h3>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li><Link href="#" className="hover:underline">Help Center</Link></li>
              <li><Link href="#" className="hover:underline">How to Buy</Link></li>
              <li><Link href="#" className="hover:underline">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">BizConnect</h3>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li><Link href="#" className="hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:underline">Digital Payments</Link></li>
              <li><Link href="#" className="hover:underline">BizConnect Blog</Link></li>
              <li><Link href="#" className="hover:underline">BizConnect Cares</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Make Money</h3>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li><Link href="#" className="hover:underline">Sell on BizConnect</Link></li>
              <li><Link href="#" className="hover:underline">Code of Conduct</Link></li>
              <li><Link href="#" className="hover:underline">Join Affiliate Program</Link></li>
            </ul>
          </div>

          {/* Column 4: Payment & Delivery */}
          <div className="col-span-2">
            <h3 className="font-bold text-gray-800 mb-4">Payment Methods</h3>
            <div className="flex gap-2 mb-6">
              {['Visa', 'MasterCard', 'Amex', 'PayPal', 'Bkash'].map((pay) => (
                <div key={pay} className="h-8 px-2 bg-white border border-gray-200 rounded-sm flex items-center justify-center text-xs font-bold text-gray-600 italic">
                  {pay}
                </div>
              ))}
            </div>

            <h3 className="font-bold text-gray-800 mb-4">Download App</h3>
            <div className="flex gap-3">
              <div className="w-32 h-10 bg-black rounded-md flex items-center justify-center text-white text-xs cursor-pointer">
                App Store
              </div>
              <div className="w-32 h-10 bg-black rounded-md flex items-center justify-center text-white text-xs cursor-pointer">
                Google Play
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} BizConnect Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Bangladesh</span>
            <span>Nepal</span>
            <span>Sri Lanka</span>
            <span>Myanmar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
