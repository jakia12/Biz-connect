/**
 * Seller Edit Product Page
 * Form to edit existing product or service
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { productSchema } from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProductPage({ params }) {
  const [existingImages] = useState([
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onBlur',
    defaultValues: {
      name: 'Professional Business Logo Design',
      category: 'Graphics & Design',
      price: 1500,
      description: 'Get a professional, unique logo design for your business. Our experienced designers will create a custom logo that perfectly represents your brand identity.',
      stock: 0,
      type: 'service', // Not in schema but useful for UI
      status: 'active',
      deliveryTime: '3-5 days',
      tags: 'logo, design, branding'
    }
  });

  const productType = watch('type');
  const status = watch('status');

  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Web Development',
    'Food & Beverage',
    'Fashion & Apparel',
    'Electronics',
    'Home & Living'
  ];

  const handleSubmitForm = (data) => {
    console.log('Product updated:', data);
    // Handle product update
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Product deleted');
      // Handle product deletion
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard/seller/products" className="hover:text-primary">My Products</Link>
          <span>/</span>
          <span>Edit Product</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update your product or service details</p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Delete Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            
            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Status</h3>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                {...register('status')}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            {/* Type Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setValue('type', 'product')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    productType === 'product'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="font-medium text-gray-900">Physical Product</span>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('type', 'service')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    productType === 'service'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-900">Service</span>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name="name"
                  placeholder="e.g., Professional Logo Design"
                  register={register}
                  error={errors.name}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Category"
                    name="category"
                    type="select"
                    options={[
                      { value: '', label: 'Select category' },
                      ...categories.map(cat => ({ value: cat, label: cat }))
                    ]}
                    register={register}
                    error={errors.category}
                    required
                  />
                  <FormField
                    label="Price (৳)"
                    name="price"
                    type="number"
                    placeholder="1500"
                    register={register}
                    error={errors.price}
                    required
                    valueAsNumber
                  />
                </div>

                <FormField
                  label="Description"
                  name="description"
                  type="textarea"
                  rows={6}
                  placeholder="Describe your product or service in detail..."
                  register={register}
                  error={errors.description}
                  required
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Additional Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {productType === 'service' ? 'Delivery Time' : 'Stock Quantity'}
                  </label>
                  {productType === 'service' ? (
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                      placeholder="e.g., 3-5 days"
                      {...register('deliveryTime')}
                    />
                  ) : (
                    <FormField
                      name="stock"
                      type="number"
                      placeholder="100"
                      register={register}
                      error={errors.stock}
                      valueAsNumber
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    placeholder="logo, design, branding"
                    {...register('tags')}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Images</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image src={img} alt={`Product ${idx + 1}`} fill className="object-cover" />
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center hover:border-primary transition-colors cursor-pointer relative">
                  <div className="text-center">
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-xs text-gray-500">Add Image</p>
                  </div>
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
              <Link href="/dashboard/seller/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Total Sales</span>
                  <span className="font-bold text-gray-900">120</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="font-bold text-gray-900">1,450</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Rating</span>
                  <span className="font-bold text-gray-900">4.9 ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
