'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-body">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Illustration */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-primary/20 font-heading">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-32 h-32 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" className="flex items-center gap-2 px-8 py-3">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-8 py-3"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">You might want to check out:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="text-sm font-medium text-primary hover:underline">
                Browse Products
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/services" className="text-sm font-medium text-primary hover:underline">
                Find Services
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/help" className="text-sm font-medium text-primary hover:underline">
                Help Center
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
