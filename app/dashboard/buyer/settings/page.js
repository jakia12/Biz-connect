/**
 * Buyer Profile Settings Page
 * Manage account information and preferences
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useState } from 'react';

export default function BuyerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+880 1712 345678',
    address: 'House 12, Road 5, Dhanmondi, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profileData);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    // Handle password update
    console.log('Password updated');
  };

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
              
              <form onSubmit={handleSaveProfile}>
                {/* Avatar Upload */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <Image src={profileData.avatar} alt="Profile" fill className="object-cover" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">Change Photo</Button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <Button type="submit" variant="primary">Save Changes</Button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
              
              <form onSubmit={handleSavePassword} className="max-w-md">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <Button type="submit" variant="primary">Update Password</Button>
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
