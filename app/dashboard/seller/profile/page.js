'use client';

import SellerProfileForm from '@/components/dashboard/seller/SellerProfileForm';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');
      const data = await response.json();

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.error || 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 ml-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 font-heading mb-6">Seller Profile</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8  w-full max-w-5xl">
        <SellerProfileForm userData={userData} onSuccess={setUserData} />
      </div>
    </div>
  );
}
