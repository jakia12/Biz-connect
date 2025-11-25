/**
 * Seller Add Product Page
 * Form to add new product or service
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { productSchema } from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function AddProductPage() {
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
      type: 'product',
      category: ''
    }
  });

  const productType = watch('type', 'product');

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
    console.log('Product added:', data);
    // Handle product creation
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
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Add New Product/Service</h1>
        <p className="text-gray-600 mt-1">Fill in the details to list your product or service</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            
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
              <input type="hidden" {...register('type')} />
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name="name" // Changed from 'title' to 'name' to match schema
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
                      {...register('deliveryTime')} // Note: deliveryTime is not in schema, might need to add it or make it optional
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
                    {...register('tags')} // Note: tags is array in schema, need to handle conversion if strictly validated
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Images</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="image/*"
                    />
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-xs text-gray-500">Upload Image {i}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Upload up to 3 images. First image will be the cover.</p>
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
              <Button type="button" variant="outline" className="flex-1">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
