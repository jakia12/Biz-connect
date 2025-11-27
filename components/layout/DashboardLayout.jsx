/**
 * Dashboard Layout with Sidebar
 * Shared layout for all dashboard pages (Buyer & Seller)
 */

'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({ children, role = 'buyer' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const buyerMenuItems = [
    { 
      icon: '📊', 
      label: 'Dashboard', 
      href: '/dashboard/buyer',
      path: '/dashboard/buyer'
    },
    { 
      icon: '🛍️', 
      label: 'My Orders', 
      href: '/dashboard/buyer/orders',
      path: '/dashboard/buyer/orders'
    },
    { 
      icon: '❤️', 
      label: 'Saved Items', 
      href: '/dashboard/buyer/saved',
      path: '/dashboard/buyer/saved'
    },
    { 
      icon: '💬', 
      label: 'Messages', 
      href: '/messages',
      path: '/messages'
    },
    { 
      icon: '⚙️', 
      label: 'Settings', 
      href: '/dashboard/buyer/settings',
      path: '/dashboard/buyer/settings'
    },
  ];

  const sellerMenuItems = [
    { 
      icon: '📊', 
      label: 'Dashboard', 
      href: '/dashboard/seller',
      path: '/dashboard/seller'
    },
    { 
      icon: '📦', 
      label: 'My Products', 
      href: '/dashboard/seller/products',
      path: '/dashboard/seller/products'
    },
    { 
      icon: '🛒', 
      label: 'Manage Orders', 
      href: '/dashboard/seller/orders',
      path: '/dashboard/seller/orders'
    },
    { 
      icon: '⭐', 
      label: 'Reviews', 
      href: '/dashboard/seller/reviews',
      path: '/dashboard/seller/reviews'
    },
    { 
      icon: '💬', 
      label: 'Messages', 
      href: '/messages',
      path: '/messages'
    },
    { 
      icon: '📈', 
      label: 'Analytics', 
      href: '/dashboard/seller/analytics',
      path: '/dashboard/seller/analytics'
    },
    { 
      icon: '⚙️', 
      label: 'Settings', 
      href: '/dashboard/seller/settings',
      path: '/dashboard/seller/settings'
    },
  ];

  const menuItems = role === 'seller' ? sellerMenuItems : buyerMenuItems;

  const isActive = (itemPath) => {
    if (itemPath === '/dashboard/buyer' || itemPath === '/dashboard/seller') {
      return pathname === itemPath;
    }
    return pathname?.startsWith(itemPath);
  };

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/login',
      redirect: true 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading hidden sm:block">BizConnect</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary">
              Back to Marketplace
            </Link>
            <div className="relative">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                    alt="User" 
                    width={32} 
                    height={32}
                    className="object-cover"
                  />
                </div>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 z-30
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Welcome back,</p>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-xs opacity-75 mt-1">
                  {role === 'seller' ? 'Seller Account' : 'Buyer Account'}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${isActive(item.path)
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
