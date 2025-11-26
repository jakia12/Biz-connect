/**
 * Seller Add Product Page
 * Form to add new product or service - Connected to API
 */

'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();
  const [productType, setProductType] = useState('product');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      status: 'active'
    }
  });

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Industrial',
    'Food & Beverage',
    'Health & Beauty',
    'Sports',
    'Automotive',
    'Construction',
    'Agriculture',
    'Textiles',
    'Other',
  ];

  const handleSubmitForm = async (data) => {
    try {
      // Convert tags from comma-separated string to array
      const formattedData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        stock: parseInt(data.stock) || 0,
        price: parseFloat(data.price),
        minOrderQuantity: parseInt(data.minOrderQuantity) || 1,
      };

      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Product created successfully!');
        router.push('/dashboard/seller/products');
      } else {
        toast.error(result.error || 'Failed to create product');
        if (result.details) {
          console.error('Validation errors:', result.details);
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
  };

  const saveAsDraft = async () => {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);
    data.status = 'inactive'; // Save as draft
    
    try {
      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
          stock: parseInt(data.stock) || 0,
          price: parseFloat(data.price),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Product saved as draft!');
        router.push('/dashboard/seller/products');
      } else {
        toast.error(result.error || 'Failed to save draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard/seller/products" className="hover:text-primary">My Products</Link>
          <span>/</span>
          <span>Add New</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Add New Product</h1>
        <p className="text-gray-600 mt-1">Fill in the details to list your product</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="e.g., Industrial Sewing Machine"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (৳) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('price', { 
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' }
                      })}
                      placeholder="1500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={6}
                    placeholder="Describe your product in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Additional Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    {...register('stock')}
                    placeholder="100"
                    defaultValue="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Order Quantity
                  </label>
                  <input
                    type="number"
                    {...register('minOrderQuantity')}
                    placeholder="1"
                    defaultValue="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    {...register('subcategory')}
                    placeholder="e.g., Heavy Duty"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    {...register('tags')}
                    placeholder="industrial, machine, textiles"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Images</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 mb-2">Image upload coming soon</p>
                <p className="text-xs text-gray-500">For now, you can add image URLs after creating the product</p>
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
                {isSubmitting ? 'Publishing...' : 'Publish Product'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={saveAsDraft}
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar Tips */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sticky top-6">
            <h3 className="font-bold text-blue-900 mb-4">💡 Tips for Success</h3>
            <ul className="space-y-3 text-sm text-blue-800">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use clear, descriptive titles</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Add high-quality images</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Write detailed descriptions</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Set competitive pricing</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use relevant tags</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Keep stock quantities updated</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
