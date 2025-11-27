/**
 * Dashboard Layout with Sidebar
 * Shared layout for all dashboard pages (Buyer & Seller)
 */

'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function DashboardLayout({ children, role = 'buyer' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get user info from session
  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userImage = session?.user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <Image 
                    src={userImage}
                    alt={userName} 
                    width={32} 
                    height={32}
                    className="object-cover"
                  />
                </div>
                <svg className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                        <Image 
                          src={userImage}
                          alt={userName} 
                          width={40} 
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href={role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>

                    <Link
                      href={role === 'seller' ? '/dashboard/seller/settings' : '/dashboard/buyer/settings'}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>

                    <Link
                      href={role === 'seller' ? '/dashboard/seller/settings' : '/dashboard/buyer/settings'}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>

                    {role === 'seller' && (
                      <Link
                        href="/dashboard/seller/analytics"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                      </Link>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
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
                <h3 className="font-bold text-lg truncate">{userName}</h3>
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