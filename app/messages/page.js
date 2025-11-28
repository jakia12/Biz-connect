'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function MessagesRedirectContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sellerId = searchParams.get('seller');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      // Not logged in, redirect to login
      router.push('/login');
      return;
    }

    // Redirect based on role
    if (session.user.role === 'buyer') {
      const url = sellerId 
        ? `/dashboard/buyer/messages?seller=${sellerId}`
        : '/dashboard/buyer/messages';
      router.push(url);
    } else if (session.user.role === 'seller') {
      router.push('/dashboard/seller/messages');
    } else {
      router.push('/');
    }
  }, [session, status, router, sellerId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to messages...</p>
      </div>
    </div>
  );
}

export default function MessagesRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <MessagesRedirectContent />
    </Suspense>
  );
}
