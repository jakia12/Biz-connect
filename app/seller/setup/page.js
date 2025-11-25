/**
 * Seller Profile Setup - Multi-step Form
 * 3 Steps: Basic Info, Business Details, Verification
 */

'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function SellerProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    businessName: '',
    businessType: '',
    category: '',
    
    // Step 2: Business Details
    description: '',
    address: '',
    city: '',
    phone: '',
    website: '',
    
    // Step 3: Verification
    tradeLicense: null,
    taxId: '',
    bankAccount: ''
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📋' },
    { number: 2, title: 'Business Details', icon: '🏢' },
    { number: 3, title: 'Verification', icon: '✓' }
  ];

  const businessTypes = ['Product Seller', 'Service Provider', 'Both'];
  const categories = [
    'Food & Beverage',
    'Fashion & Apparel',
    'Electronics',
    'Graphics & Design',
    'Digital Marketing',
    'Web Development'
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              B
            </div>
            <span className="text-3xl font-bold text-gray-900 font-heading">BizConnect</span>
          </Link>
          <p className="text-gray-600 mt-2">Complete your seller profile</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-all ${
                    currentStep >= step.number
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <form className="space-y-6">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, businessType: type})}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          formData.businessType === type
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="Tell customers about your business..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                      placeholder="City"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                      placeholder="+880 1XXX-XXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">Verification Documents</h4>
                      <p className="text-sm text-blue-800">Upload your business documents to get verified and build trust with buyers.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade License / Business Registration
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID / NID Number
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="Enter your Tax ID or NID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Number (for payments)
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="Enter your bank account number"
                  />
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  className="px-8 py-3"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="primary"
                  className="px-8 py-3"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Skip Link */}
        <div className="text-center mt-6">
          <Link href="/dashboard/seller" className="text-sm text-gray-500 hover:text-gray-700">
            Skip for now (you can complete this later)
          </Link>
        </div>
      </div>
    </div>
  );
}
