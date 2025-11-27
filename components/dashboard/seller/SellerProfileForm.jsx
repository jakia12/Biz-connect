'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { sellerSettingsSchema } from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SellerProfileForm({ userData, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(sellerSettingsSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (userData) {
      const profile = userData.sellerProfile || {};
      reset({
        businessName: profile.businessName || userData.businessName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: profile.location || userData.businessAddress || '', // Use location as primary address
        description: profile.description || userData.businessDescription || '',
        // New fields
        businessType: profile.businessType || '',
        category: profile.category || '',
        district: profile.district || '',
        businessHoursFrom: profile.businessHours?.from || '',
        businessHoursTo: profile.businessHours?.to || '',
        taxId: profile.taxId || '',
        website: profile.website || '',
        bankAccount: profile.bankAccount || '',
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.businessName,
          phone: data.phone,
          businessName: data.businessName,
          address: data.address, // Maps to location/businessAddress
          description: data.description,
          // New fields
          businessType: data.businessType,
          category: data.category,
          location: data.address, // Use address as location
          district: data.district,
          businessHoursFrom: data.businessHoursFrom,
          businessHoursTo: data.businessHoursTo,
          taxId: data.taxId,
          website: data.website,
          bankAccount: data.bankAccount,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Profile updated successfully');
        if (onSuccess) onSuccess(result.user);
        // Reload page to refresh session and update sidebar name
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Avatar Upload */}
      <div className="mb-8 flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
          <Image 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop" 
            alt="Business Logo" 
            fill 
            className="object-cover" 
          />
        </div>
        <div>
          <Button type="button" variant="outline" size="sm" className="mb-2">Change Logo</Button>
          <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              name="businessName" // Using businessName as name for now based on API mapping
              register={register}
              error={errors.businessName}
              required
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              register={register}
              error={errors.phone}
              required
            />
          </div>
          <div className="mt-6">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              required
              disabled
            />
          </div>
        </div>

        {/* Business Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Business Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Business Name"
              name="businessName"
              register={register}
              error={errors.businessName}
              required
            />
            <FormField
              label="Business Type"
              name="businessType"
              type="select"
              options={[
                { value: 'product', label: 'Product Based' },
                { value: 'service', label: 'Service Based' },
                { value: 'both', label: 'Both' }
              ]}
              register={register}
              error={errors.businessType}
            />
          </div>

          <div className="mb-6">
            <FormField
              label="Business Address"
              name="address"
              type="textarea"
              rows={3}
              placeholder="Enter your business address"
              register={register}
              error={errors.address}
              required
            />
          </div>

          <div className="mb-6">
            <FormField
              label="Business Description"
              name="description"
              type="textarea"
              rows={4}
              placeholder="Tell buyers about your business..."
              register={register}
              error={errors.description}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Tax ID / Trade License"
              name="taxId"
              placeholder="Enter Tax ID or Trade License Number"
              register={register}
              error={errors.taxId}
            />
            <FormField
              label="Website"
              name="website"
              type="url"
              placeholder="https://example.com"
              register={register}
              error={errors.website}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Category"
              name="category"
              register={register}
              error={errors.category}
            />
            <FormField
              label="District"
              name="district"
              register={register}
              error={errors.district}
            />
          </div>
        </div>

        {/* Bank Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Bank Information (Optional)</h3>
          <p className="text-sm text-gray-500 mb-6">This information is kept secure and used for payment processing</p>
          
          <FormField
            label="Bank Account Number"
            name="bankAccount"
            placeholder="Enter your bank account number"
            register={register}
            error={errors.bankAccount}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
