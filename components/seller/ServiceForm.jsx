"use client";

import Button from '@/components/ui/Button';
import {
    serviceDescriptionSchema,
    serviceGallerySchema,
    serviceOverviewSchema,
    servicePricingSchema,
    serviceRequirementsSchema
} from '@/lib/validators/serviceSchema';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const STEPS = ['Overview', 'Pricing', 'Description', 'Requirements', 'Gallery'];

const CATEGORIES = [
  { name: 'Graphics & Design', subcategories: ['Logo Design', 'Brand Identity', 'Illustration', 'UI/UX Design'] },
  { name: 'Digital Marketing', subcategories: ['SEO', 'Social Media', 'Content Marketing', 'Email Marketing'] },
  { name: 'Web Development', subcategories: ['Frontend', 'Backend', 'Full Stack', 'WordPress'] },
  { name: 'Content Writing', subcategories: ['Blog Posts', 'Copywriting', 'Technical Writing', 'Creative Writing'] },
  { name: 'Video & Animation', subcategories: ['Video Editing', '2D Animation', '3D Animation', 'Motion Graphics'] },
  { name: 'Business Consulting', subcategories: ['Strategy', 'Marketing', 'Finance', 'HR'] }
];

export default function ServiceForm({ initialData, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Overview
    title: '',
    category: '',
    subcategory: '',
    tags: [],

    // Step 2: Pricing
    packages: [
      { name: 'Basic', description: '', price: '', deliveryTime: '', revisions: '', features: [''] }
    ],

    // Step 3: Description
    description: '',
    faqs: [],

    // Step 4: Requirements
    requirements: [],

    // Step 5: Gallery
    coverImage: '',
    gallery: [],
    videoUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        // Ensure arrays are initialized if missing in initialData
        tags: initialData.tags || [],
        packages: initialData.packages || prev.packages,
        faqs: initialData.faqs || [],
        requirements: initialData.requirements || [],
        gallery: initialData.gallery || []
      }));
    }
  }, [initialData]);

  const [tagInput, setTagInput] = useState('');

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPackage = () => {
    if (formData.packages.length < 3) {
      const packageNames = ['Basic', 'Standard', 'Premium'];
      setFormData(prev => ({
        ...prev,
        packages: [...prev.packages, {
          name: packageNames[prev.packages.length],
          description: '',
          price: '',
          deliveryTime: '',
          revisions: '',
          features: ['']
        }]
      }));
    }
  };

  const removePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const updatePackage = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === index ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const addPackageFeature = (packageIndex) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === packageIndex ? { ...pkg, features: [...pkg.features, ''] } : pkg
      )
    }));
  };

  const updatePackageFeature = (packageIndex, featureIndex, value) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === packageIndex ? {
          ...pkg,
          features: pkg.features.map((f, fi) => fi === featureIndex ? value : f)
        } : pkg
      )
    }));
  };

  const removePackageFeature = (packageIndex, featureIndex) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === packageIndex ? {
          ...pkg,
          features: pkg.features.filter((_, fi) => fi !== featureIndex)
        } : pkg
      )
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFAQ = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const removeFAQ = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, { question: '', type: 'text', required: true }]
    }));
  };

  const updateRequirement = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => 
        i === index ? { ...req, [field]: value } : req
      )
    }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    // Clear all errors before validation
    setErrors({});
    
    let result;

    switch (currentStep) {
      case 0: // Overview
        result = serviceOverviewSchema.safeParse({
          title: formData.title,
          category: formData.category,
          subcategory: formData.subcategory,
          tags: formData.tags
        });
        break;

      case 1: // Pricing
        // Ensure numbers are actually numbers before validation
        const pricingData = {
          packages: formData.packages.map(pkg => ({
            ...pkg,
            price: Number(pkg.price),
            deliveryTime: Number(pkg.deliveryTime),
            revisions: Number(pkg.revisions)
          }))
        };
        result = servicePricingSchema.safeParse(pricingData);
        break;

      case 2: // Description
        result = serviceDescriptionSchema.safeParse({
          description: formData.description,
          faqs: formData.faqs
        });
        break;

      case 3: // Requirements
        result = serviceRequirementsSchema.safeParse({ requirements: formData.requirements });
        break;

      case 4: // Gallery
        result = serviceGallerySchema.safeParse({
          coverImage: formData.coverImage,
          gallery: formData.gallery,
          videoUrl: formData.videoUrl
        });
        break;

      default:
        return true;
    }

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        formattedErrors[path] = issue.message;
      });
      setErrors(formattedErrors);
      
      const firstError = Object.values(formattedErrors)[0];
      if (firstError) toast.error(firstError);
      
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFormSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);

      // Clean up packages
      const cleanedPackages = formData.packages.map(pkg => ({
        ...pkg,
        price: parseFloat(pkg.price),
        deliveryTime: parseInt(pkg.deliveryTime),
        revisions: parseInt(pkg.revisions),
        features: pkg.features.filter(f => f.trim())
      }));

      const serviceData = {
        title: formData.title.trim(),
        category: formData.category,
        subcategory: formData.subcategory,
        tags: formData.tags,
        packages: cleanedPackages,
        description: formData.description.trim(),
        faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
        requirements: formData.requirements.filter(req => req.question.trim()),
        coverImage: formData.coverImage,
        gallery: formData.gallery,
        videoUrl: formData.videoUrl.trim(),
        status: isEditing ? formData.status : 'draft'
      };

      await onSubmit(serviceData);
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = CATEGORIES.find(c => c.name === formData.category);

  return (
    <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'Edit Service' : 'Create New Service'}</h1>
          <p className="text-gray-600 mt-1">{isEditing ? 'Update your service details' : 'Fill in the details to create your service offering'}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={index} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 ${index <= currentStep ? 'text-primary font-medium' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          {/* Step 1: Overview */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="I will create a professional logo design"
                  maxLength={80}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/80 characters</p>
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      updateFormData('category', e.target.value);
                      updateFormData('subcategory', '');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => updateFormData('subcategory', e.target.value)}
                    disabled={!formData.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select subcategory</option>
                    {selectedCategory?.subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  {errors.subcategory && <p className="text-xs text-red-500 mt-1">{errors.subcategory}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Tags (Max 5)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag"
                    maxLength={20}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button onClick={addTag} disabled={formData.tags.length >= 5}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button onClick={() => removeTag(index)} className="hover:text-primary-dark">×</button>
                    </span>
                  ))}
                </div>
                {errors.tags && <p className="text-xs text-red-500 mt-1">{errors.tags}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Pricing Packages</h3>
                {formData.packages.length < 3 && (
                  <Button onClick={addPackage} variant="outline" size="sm">Add Package</Button>
                )}
              </div>

              {formData.packages.map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">{pkg.name} Package</h4>
                    {formData.packages.length > 1 && (
                      <button onClick={() => removePackage(pkgIndex)} className="text-red-600 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={pkg.description}
                        onChange={(e) => updatePackage(pkgIndex, 'description', e.target.value)}
                        rows={2}
                        maxLength={200}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors[`packages.${pkgIndex}.description`] && <p className="text-xs text-red-500 mt-1">{errors[`packages.${pkgIndex}.description`]}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (৳) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => updatePackage(pkgIndex, 'price', e.target.value)}
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {errors[`packages.${pkgIndex}.price`] && <p className="text-xs text-red-500 mt-1">{errors[`packages.${pkgIndex}.price`]}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery (days) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={pkg.deliveryTime}
                          onChange={(e) => updatePackage(pkgIndex, 'deliveryTime', e.target.value)}
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {errors[`packages.${pkgIndex}.deliveryTime`] && <p className="text-xs text-red-500 mt-1">{errors[`packages.${pkgIndex}.deliveryTime`]}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Revisions <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={pkg.revisions}
                          onChange={(e) => updatePackage(pkgIndex, 'revisions', e.target.value)}
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {errors[`packages.${pkgIndex}.revisions`] && <p className="text-xs text-red-500 mt-1">{errors[`packages.${pkgIndex}.revisions`]}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features <span className="text-red-500">*</span>
                      </label>
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updatePackageFeature(pkgIndex, featureIndex, e.target.value)}
                            placeholder="Feature description"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          {pkg.features.length > 1 && (
                            <button
                              onClick={() => removePackageFeature(pkgIndex, featureIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <Button onClick={() => addPackageFeature(pkgIndex)} variant="outline" size="sm">
                        Add Feature
                      </Button>
                      {errors[`packages.${pkgIndex}.features`] && <p className="text-xs text-red-500 mt-1">{errors[`packages.${pkgIndex}.features`]}</p>}
                    </div>
                  </div>
                </div>
              ))}
              {errors.packages && <p className="text-xs text-red-500 mt-1">{errors.packages}</p>}
            </div>
          )}

          {/* Step 3: Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={8}
                  minLength={100}
                  maxLength={2000}
                  placeholder="Describe your service in detail..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/2000 characters (min 100)</p>
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Frequently Asked Questions
                  </label>
                  <Button onClick={addFAQ} variant="outline" size="sm">Add FAQ</Button>
                </div>

                {formData.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                      <button onClick={() => removeFAQ(index)} className="text-red-600 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      placeholder="Question"
                      maxLength={200}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      placeholder="Answer"
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors[`faqs.${index}.question`] && <p className="text-xs text-red-500 mt-1">{errors[`faqs.${index}.question`]}</p>}
                    {errors[`faqs.${index}.answer`] && <p className="text-xs text-red-500 mt-1">{errors[`faqs.${index}.answer`]}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Buyer Requirements
                    </label>
                    <p className="text-xs text-gray-500 mt-1">What information do you need from buyers to start?</p>
                  </div>
                  <Button onClick={addRequirement} variant="outline" size="sm">Add Requirement</Button>
                </div>

                {formData.requirements.map((req, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Requirement #{index + 1}</span>
                      <button onClick={() => removeRequirement(index)} className="text-red-600 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={req.question}
                      onChange={(e) => updateRequirement(index, 'question', e.target.value)}
                      placeholder="What do you need from the buyer?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
                    />
                    {errors[`requirements.${index}.question`] && <p className="text-xs text-red-500 mt-1">{errors[`requirements.${index}.question`]}</p>}
                    <div className="flex gap-4">
                      <select
                        value={req.type}
                        onChange={(e) => updateRequirement(index, 'type', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="text">Text Answer</option>
                        <option value="file">File Upload</option>
                      </select>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={req.required}
                          onChange={(e) => updateRequirement(index, 'required', e.target.checked)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">Required</span>
                      </label>
                    </div>
                  </div>
                ))}

                {formData.requirements.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No requirements added yet</p>
                    <p className="text-sm">Click "Add Requirement" to add buyer requirements</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Gallery */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => {
                    updateFormData('coverImage', e.target.value);
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.coverImage;
                      return newErrors;
                    });
                  }}
                  placeholder="https://i.imgur.com/example.jpg or https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste an image URL from Imgur, ImgBB, Unsplash, etc.
                </p>
                {errors.coverImage && <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>}

                {/* Preview */}
                {formData.coverImage && (
                  <div className="mt-4 relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={formData.coverImage} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Optional, Max 5)
                </label>
                
                {/* Gallery URL Inputs */}
                <div className="space-y-3 mb-4">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                          const newGallery = [...formData.gallery];
                          newGallery[index] = e.target.value;
                          updateFormData('gallery', newGallery);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button 
                        onClick={() => removeGalleryImage(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  {formData.gallery.length < 5 && (
                    <Button 
                      onClick={() => updateFormData('gallery', [...formData.gallery, ''])}
                      variant="outline" 
                      size="sm"
                    >
                      Add Image URL
                    </Button>
                  )}
                </div>

                {/* Gallery Previews */}
                {formData.gallery.some(url => url) && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {formData.gallery.map((url, index) => url ? (
                      <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-gray-200 group">
                        <img 
                          src={url} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/150?text=Invalid';
                          }}
                        />
                      </div>
                    ) : null)}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => updateFormData('videoUrl', e.target.value)}
                  placeholder="YouTube or Vimeo URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.videoUrl && <p className="text-xs text-red-500 mt-1">{errors.videoUrl}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || loading}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext} variant="primary">
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handleFormSubmit} 
              disabled={loading} 
              variant="primary"
              className="min-w-[120px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                isEditing ? 'Save Changes' : 'Create Service'
              )}
            </Button>
          )}
        </div>
    </div>
  );
}
