/**
 * Buyer Profile Settings Page
 * Manage account information and preferences
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { buyerSettingsSchema, passwordChangeSchema } from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function BuyerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting }
  } = useForm({
    resolver: zodResolver(buyerSettingsSchema),
    mode: 'onBlur',
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting }
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onBlur'
  });

  // Fetch user data on mount
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
        // Split name into first and last name
        const nameParts = (data.user.name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Reset form with fetched data
        resetProfile({
          firstName,
          lastName,
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: data.user.businessAddress || '',
        });
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

  const onProfileSubmit = async (data) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`.trim(),
          phone: data.phone,
          address: data.address,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Profile updated successfully');
        setUserData(result.user);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      const response = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Password updated successfully');
        resetPassword();
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 ml-4">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 font-heading mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors ${
                activeTab === 'profile' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors ${
                activeTab === 'password' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'notifications' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                {/* Avatar Upload */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <Button type="button" variant="outline" size="sm" className="mb-2">Change Photo</Button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="First Name"
                    name="firstName"
                    register={registerProfile}
                    error={profileErrors.firstName}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    register={registerProfile}
                    error={profileErrors.lastName}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    register={registerProfile}
                    error={profileErrors.email}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    register={registerProfile}
                    error={profileErrors.phone}
                    required
                  />
                </div>

                <div className="mb-8">
                  <FormField
                    label="Shipping Address"
                    name="address"
                    type="textarea"
                    rows={3}
                    register={registerProfile}
                    error={profileErrors.address}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isProfileSubmitting}
                >
                  {isProfileSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
              
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="max-w-md space-y-6">
                <FormField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  register={registerPassword}
                  error={passwordErrors.currentPassword}
                  required
                />
                <FormField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  register={registerPassword}
                  error={passwordErrors.newPassword}
                  required
                />
                <FormField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  register={registerPassword}
                  error={passwordErrors.confirmPassword}
                  required
                />

                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isPasswordSubmitting}
                >
                  {isPasswordSubmitting ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Order Updates</h3>
                    <p className="text-sm text-gray-500">Receive emails about your order status</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Promotions</h3>
                    <p className="text-sm text-gray-500">Receive emails about new products and deals</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">Receive emails when you get a new message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
