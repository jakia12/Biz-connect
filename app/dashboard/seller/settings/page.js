/**
 * Seller Settings Page
 * Manage seller account settings and preferences
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useState } from 'react';

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    businessName: 'Creative Studio BD',
    email: 'contact@creativestudio.bd',
    phone: '+880 1712 345678',
    address: 'House 12, Road 5, Dhanmondi, Dhaka',
    description: 'Professional design studio specializing in branding and digital marketing.',
    avatar: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
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
              Business Profile
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
              onClick={() => setActiveTab('payment')}
              className={`w-full text-left px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors ${
                activeTab === 'payment' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Payment Settings
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
          
          {/* Business Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Business Profile</h2>
              
              <form onSubmit={handleSaveProfile}>
                {/* Avatar Upload */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <Image src={profileData.avatar} alt="Business Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">Change Logo</Button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                    <textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" className="mt-6">Save Changes</Button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
              
              <form onSubmit={handleSavePassword} className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                <div>
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

          {/* Payment Settings Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="Enter your bank account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="Enter your bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">bKash Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <Button variant="primary">Save Payment Info</Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">New Orders</h3>
                    <p className="text-sm text-gray-500">Receive emails when you get a new order</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
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

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Reviews</h3>
                    <p className="text-sm text-gray-500">Receive emails when you get a new review</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing Updates</h3>
                    <p className="text-sm text-gray-500">Receive emails about new features and tips</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
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
