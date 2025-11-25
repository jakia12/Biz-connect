/**
 * Seller Profile Setup - Multi-step Form
 * 3 Steps: Basic Info, Business Details, Verification
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import {
  sellerSetupStep1Schema,
  sellerSetupStep2Schema,
  sellerSetupStep3Schema
} from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Merge schemas for the full form
const sellerSetupSchema = z.object({
  ...sellerSetupStep1Schema.shape,
  ...sellerSetupStep2Schema.shape,
  ...sellerSetupStep3Schema.shape
});

export default function SellerProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(sellerSetupSchema),
    mode: 'onBlur',
    defaultValues: {
      businessType: 'Product Seller',
      category: ''
    }
  });

  const formValues = watch();

  const steps = [
    { 
      number: 1, 
      title: 'Basic Info', 
      icon: '📋',
      fields: ['businessName', 'businessType', 'category']
    },
    { 
      number: 2, 
      title: 'Business Details', 
      icon: '🏢',
      fields: ['description', 'address', 'city', 'phone', 'website']
    },
    { 
      number: 3, 
      title: 'Verification', 
      icon: '✓',
      fields: ['tradeLicense', 'taxId', 'bankAccount']
    }
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

  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep - 1].fields;
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = (data) => {
    console.log('Seller Setup Data:', data);
    // Handle form submission
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <>
                <FormField
                  label="Business Name"
                  name="businessName"
                  placeholder="Enter your business name"
                  register={register}
                  error={errors.businessName}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue('businessType', type, { shouldValidate: true })}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          formValues.businessType === type
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{type}</span>
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register('businessType')} />
                  {errors.businessType && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>
                  )}
                </div>

                <FormField
                  label="Primary Category"
                  name="category"
                  type="select"
                  options={[
                    { value: '', label: 'Select a category' },
                    ...categories.map(cat => ({ value: cat, label: cat }))
                  ]}
                  register={register}
                  error={errors.category}
                  required
                />
              </>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <>
                <FormField
                  label="Business Description"
                  name="description"
                  type="textarea"
                  rows={4}
                  placeholder="Tell customers about your business..."
                  register={register}
                  error={errors.description}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Address"
                    name="address"
                    placeholder="Street address"
                    register={register}
                    error={errors.address}
                    required
                  />
                  <FormField
                    label="City"
                    name="city"
                    placeholder="City"
                    register={register}
                    error={errors.city}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    register={register}
                    error={errors.phone}
                    required
                  />
                  <FormField
                    label="Website (Optional)"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    register={register}
                    error={errors.website}
                  />
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register('tradeLicense')}
                    />
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
                  </div>
                  {errors.tradeLicense && (
                    <p className="text-red-500 text-xs mt-1">{errors.tradeLicense.message}</p>
                  )}
                </div>

                <FormField
                  label="Tax ID / NID Number"
                  name="taxId"
                  placeholder="Enter your Tax ID or NID"
                  register={register}
                  error={errors.taxId}
                />

                <FormField
                  label="Bank Account Number (for payments)"
                  name="bankAccount"
                  placeholder="Enter your bank account number"
                  register={register}
                  error={errors.bankAccount}
                />
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
                  type="submit"
                  variant="primary"
                  className="px-8 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Completing Setup...' : 'Complete Setup'}
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
