/**
 * Register Page
 * Buyer: Simple single-step registration
 * Seller: Multi-step registration (3 steps)
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import {
    buyerRegistrationSchema,
    sellerRegistrationSchema
} from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'
  const [currentStep, setCurrentStep] = useState(1); // For seller multi-step
  const [logoPreview, setLogoPreview] = useState(null);
  
  // Buyer Form
  const { 
    register: registerBuyer, 
    handleSubmit: handleBuyerSubmit,
    formState: { errors: buyerErrors, isSubmitting: isBuyerSubmitting }
  } = useForm({
    resolver: zodResolver(buyerRegistrationSchema),
    mode: 'onBlur'
  });

  // Seller Form
  const { 
    register: registerSeller, 
    handleSubmit: handleSellerSubmit,
    trigger: triggerSeller,
    setValue: setSellerValue,
    watch: watchSeller,
    formState: { errors: sellerErrors, isSubmitting: isSellerSubmitting }
  } = useForm({
    resolver: zodResolver(sellerRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      location: 'Dhaka',
      district: 'Gulshan',
      businessHoursFrom: '9:00 AM',
      businessHoursTo: '10:00 PM',
      businessType: 'product'
    }
  });

  const sellerValues = watchSeller();

  const sellerSteps = [
    { number: 1, title: 'Account Info', subtitle: 'Step 1 of 3', fields: ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'] },
    { number: 2, title: 'Business Info', subtitle: 'Step 2 of 3', fields: ['businessName', 'businessType', 'category', 'location', 'district'] },
    { number: 3, title: 'Description', subtitle: 'Step 3 of 3', fields: ['description', 'businessHoursFrom', 'businessHoursTo'] }
  ];

  const productCategories = [
    'Food & Beverage',
    'Fashion & Apparel',
    'Handmade Crafts',
    'Electronics',
    'Home & Living',
    'Beauty & Care',
    'Agriculture'
  ];

  const serviceCategories = [
    'Graphics & Design',
    'Digital Marketing',
    'Web Development',
    'Content Writing',
    'Video & Animation',
    'Business Consulting'
  ];

  // Get categories based on business type
  const getCategories = () => {
    const businessType = sellerValues.businessType;
    if (businessType === 'product') {
      return productCategories;
    } else if (businessType === 'service') {
      return serviceCategories;
    } else if (businessType === 'both') {
      return [...productCategories, ...serviceCategories];
    }
    return [];
  };

  const locations = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Rangpur',
    'Mymensingh'
  ];

  const districts = {
    'Dhaka': ['Gulshan', 'Banani', 'Dhanmondi', 'Mirpur', 'Uttara', 'Mohammadpur', 'Motijheel'],
    'Chittagong': ['Agrabad', 'Nasirabad', 'Panchlaish', 'Khulshi', 'Halishahar'],
    'Sylhet': ['Zindabazar', 'Ambarkhana', 'Shahjalal Upashahar', 'Kumarpara'],
    'Rajshahi': ['Shaheb Bazar', 'Boalia', 'Motihar', 'Rajpara'],
    'Khulna': ['Khalishpur', 'Sonadanga', 'Daulatpur', 'Khan Jahan Ali'],
    'Barisal': ['Sadar Road', 'Nathullabad', 'Bogura Road'],
    'Rangpur': ['Jahaj Company More', 'Satmatha', 'Dhap'],
    'Mymensingh': ['Ganginarpar', 'Charpara', 'Kachari']
  };

  const timeOptions = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ];

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setCurrentStep(1);
  };

  const handleNext = async () => {
    const fieldsToValidate = sellerSteps[currentStep - 1].fields;
    const isStepValid = await triggerSeller(fieldsToValidate);

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

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSellerValue('logo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onBuyerSubmit = async (data) => {
    try {
      console.log('[Frontend] Submitting buyer registration');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'buyer', ...data }),
      });
      const result = await response.json();
      console.log('[Frontend] Response:', result);
      if (!response.ok) throw new Error(result.error || 'Registration failed');
      toast.success('Account created successfully! Redirecting to login...');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (error) {
      console.error('[Frontend] Error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  const onSellerSubmit = async (data) => {
    try {
      console.log('[Frontend] Submitting seller registration');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'seller', ...data }),
      });
      const result = await response.json();
      console.log('[Frontend] Response:', result);
      if (!response.ok) throw new Error(result.error || 'Registration failed');
      toast.success('Seller account created successfully! Redirecting to login...');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (error) {
      console.error('[Frontend] Error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-body flex items-center justify-center py-12 px-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#fff', color: '#333', padding: '16px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }, success: { iconTheme: { primary: '#10b981', secondary: '#fff' } }, error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } } }} />
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              B
            </div>
            <span className="text-3xl font-bold text-gray-900 font-heading">BizConnect</span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account and start growing</p>
        </div>

        {/* Progress Indicator - Only for Sellers */}
        {role === 'seller' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between">
              {sellerSteps.map((step, idx) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all duration-300 ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                    </div>
                    <span className={`text-xs font-medium text-center hidden sm:block ${
                      currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {idx < sellerSteps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Role Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">I want to:</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleRoleChange('buyer')}
                className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  role === 'buyer' 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  role === 'buyer' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className={`font-bold text-base ${role === 'buyer' ? 'text-primary' : 'text-gray-700'}`}>
                    Buy Products
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">Find suppliers & services</p>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => handleRoleChange('seller')}
                className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  role === 'seller' 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  role === 'seller' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className={`font-bold text-base ${role === 'seller' ? 'text-primary' : 'text-gray-700'}`}>
                    Sell Products
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">Grow your business</p>
                </div>
              </button>
            </div>
          </div>

          {/* Step Title - Only for Sellers */}
          {role === 'seller' && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{sellerSteps[currentStep - 1].title}</h2>
              <p className="text-sm text-gray-500 mt-1">{sellerSteps[currentStep - 1].subtitle}</p>
            </div>
          )}

          {/* BUYER FORM */}
          {role === 'buyer' && (
            <form onSubmit={handleBuyerSubmit(onBuyerSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="First name"
                  name="firstName"
                  placeholder="John"
                  register={registerBuyer}
                  error={buyerErrors.firstName}
                  required
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  placeholder="Doe"
                  register={registerBuyer}
                  error={buyerErrors.lastName}
                  required
                />
              </div>

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                register={registerBuyer}
                error={buyerErrors.email}
                required
              />

              <FormField
                label="Phone number"
                name="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                register={registerBuyer}
                error={buyerErrors.phone}
                required
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                register={registerBuyer}
                error={buyerErrors.password}
                required
              />

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    {...registerBuyer('terms')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-primary-dark font-medium">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary hover:text-primary-dark font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                  {buyerErrors.terms && (
                    <p className="text-red-500 text-xs mt-1">{buyerErrors.terms.message}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full justify-center py-3 text-base font-bold shadow-colored"
                disabled={isBuyerSubmitting}
              >
                {isBuyerSubmitting ? 'Creating Account...' : 'Create Buyer Account'}
              </Button>
            </form>
          )}

          {/* SELLER FORM */}
          {role === 'seller' && (
            <form onSubmit={handleSellerSubmit(onSellerSubmit)} className="space-y-5">
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="First name"
                      name="firstName"
                      placeholder="John"
                      register={registerSeller}
                      error={sellerErrors.firstName}
                      required
                    />
                    <FormField
                      label="Last name"
                      name="lastName"
                      placeholder="Doe"
                      register={registerSeller}
                      error={sellerErrors.lastName}
                      required
                    />
                  </div>

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    register={registerSeller}
                    error={sellerErrors.email}
                    required
                  />

                  <FormField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    register={registerSeller}
                    error={sellerErrors.phone}
                    required
                  />

                  <FormField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    register={registerSeller}
                    error={sellerErrors.password}
                    required
                  />

                  <FormField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    register={registerSeller}
                    error={sellerErrors.confirmPassword}
                    required
                  />
                </>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <>
                  <FormField
                    label="Business name"
                    name="businessName"
                    placeholder="Your Shop Name"
                    register={registerSeller}
                    error={sellerErrors.businessName}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Business type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['product', 'service', 'both'].map((type) => (
                        <label
                          key={type}
                          className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            sellerValues.businessType === type
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            value={type}
                            className="sr-only"
                            {...registerSeller('businessType')}
                            onChange={(e) => {
                              registerSeller('businessType').onChange(e);
                              // Reset category when business type changes
                              setSellerValue('category', '');
                            }}
                          />
                          <span className={`text-sm font-medium capitalize ${
                            sellerValues.businessType === type ? 'text-primary' : 'text-gray-700'
                          }`}>
                            {type}
                          </span>
                          {sellerValues.businessType === type && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    {sellerErrors.businessType && (
                      <p className="text-red-500 text-xs mt-1">{sellerErrors.businessType.message}</p>
                    )}
                  </div>

                  <FormField
                    label="Category"
                    name="category"
                    type="select"
                    options={[
                      { value: '', label: 'Select category' },
                      ...getCategories().map(cat => ({ value: cat, label: cat }))
                    ]}
                    register={registerSeller}
                    error={sellerErrors.category}
                    required
                    helperText={
                      sellerValues.businessType === 'product' 
                        ? 'Product categories' 
                        : sellerValues.businessType === 'service'
                        ? 'Service categories'
                        : 'All categories'
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Location"
                      name="location"
                      type="select"
                      options={locations.map(loc => ({ value: loc, label: loc }))}
                      register={registerSeller}
                      error={sellerErrors.location}
                      required
                      onChange={(e) => {
                        registerSeller('location').onChange(e);
                        // Reset district when location changes
                        setSellerValue('district', districts[e.target.value][0]);
                      }}
                    />
                    
                    <FormField
                      label="District"
                      name="district"
                      type="select"
                      options={
                        sellerValues.location 
                          ? districts[sellerValues.location]?.map(dist => ({ value: dist, label: dist })) 
                          : []
                      }
                      register={registerSeller}
                      error={sellerErrors.district}
                      required
                    />
                  </div>
                </>
              )}

              {/* Step 3: Description + Logo */}
              {currentStep === 3 && (
                <>
                  <FormField
                    label="Business description"
                    name="description"
                    type="textarea"
                    rows={5}
                    placeholder="Tell customers about your business..."
                    register={registerSeller}
                    error={sellerErrors.description}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business hours
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">From</label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                          {...registerSeller('businessHoursFrom')}
                        >
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">To</label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                          {...registerSeller('businessHoursTo')}
                        >
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business logo <span className="text-gray-500 font-normal">(Optional - add now or later)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="sr-only"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all bg-gray-50 hover:bg-gray-100"
                      >
                        {logoPreview ? (
                          <div className="relative w-full h-full p-4">
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="text-white text-sm font-medium">Click to change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6">
                            <Upload className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG or SVG (max. 2MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons for Seller */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="primary"
                    className="px-8 py-3 flex items-center gap-2"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-8 py-3 flex items-center gap-2"
                    disabled={isSellerSubmitting}
                  >
                    {isSellerSubmitting ? (
                      'Registering...'
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Complete Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          )}

          {/* Social Signup - Only for Buyers */}
          {role === 'buyer' && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
