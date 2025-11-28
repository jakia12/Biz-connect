"use client";

import Button from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VerificationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    documents: [],
    message: ''
  });

  useEffect(() => {
    if (session?.user?.role !== 'seller') {
      router.push('/dashboard');
    } else {
      fetchSellerProfile();
    }
  }, [session]);

  const fetchSellerProfile = async () => {
    try {
      const response = await fetch('/api/seller/profile');
      const data = await response.json();
      
      if (data.success) {
        setSellerProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (formData.documents.length + files.length > 5) {
      toast.error('Maximum 5 documents allowed');
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      
      Array.from(files).forEach(file => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('/api/upload?type=document', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, ...data.files.map(f => f.url)]
        }));
        toast.success(`${data.files.length} document(s) uploaded`);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Simple validation - only message is required
    if (!formData.message || formData.message.trim().length < 20) {
      toast.error('Message must be at least 20 characters');
      return;
    }

    if (formData.message.trim().length > 500) {
      toast.error('Message must be less than 500 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/seller/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: formData.message.trim(),
          documents: formData.documents // Optional
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Verification request submitted successfully!');
        fetchSellerProfile(); // Refresh profile to show updated status
        setFormData({ documents: [], message: '' });
      } else {
        toast.error(data.error || 'Failed to submit verification request');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit verification request');
    } finally {
      setLoading(false);
    }
  };

  if (!sellerProfile) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    const statusConfig = {
      idle: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Submitted' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Verified' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[sellerProfile.verificationStatus] || statusConfig.idle;
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Seller Verification</h1>
          {getStatusBadge()}
        </div>
        <p className="text-gray-600">Submit your documents to get verified as a trusted seller</p>
      </div>

      {sellerProfile.verificationStatus === 'approved' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-green-800">Verified Seller</h3>
              <p className="text-sm text-green-700 mt-1">Your account has been verified. You can now enjoy all verified seller benefits.</p>
            </div>
          </div>
        </div>
      )}

      {sellerProfile.verificationStatus === 'pending' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Verification Pending</h3>
              <p className="text-sm text-yellow-700 mt-1">Your verification request is under review. We'll notify you once it's processed.</p>
            </div>
          </div>
        </div>
      )}

      {sellerProfile.verificationStatus === 'rejected' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Verification Rejected</h3>
              <p className="text-sm text-red-700 mt-1">{sellerProfile.rejectionReason || 'Your verification request was rejected. Please review and resubmit.'}</p>
            </div>
          </div>
        </div>
      )}

      {(!sellerProfile.verificationStatus || sellerProfile.verificationStatus === 'idle' || sellerProfile.verificationStatus === 'rejected') && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="space-y-6">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Documents <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">Upload business license, NID, or other relevant documents (Max 5 files)</p> */}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {formData.documents.map((doc, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 truncate">Document {index + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* {formData.documents.length < 5 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="document-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="font-medium">{uploading ? 'Uploading...' : 'Click to upload documents'}</p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG (max 5MB each)</p>
                    </div>
                  </label>
                </div>
              )}
              {errors.documents && <p className="text-xs text-red-500 mt-1">{errors.documents}</p>} */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Admin <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={5}
                placeholder="Explain why you want to be verified and provide any additional information..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters (min 20)</p>
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={loading || uploading}
              >
                {loading ? 'Submitting...' : 'Submit Verification Request'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
