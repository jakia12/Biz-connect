"use client";

import Button from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminVerifications() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/dashboard');
    } else {
      fetchVerifications();
    }
  }, [session, filter]);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/verifications?status=${filter}`);
      const data = await response.json();
      
      if (data.success) {
        setVerifications(data.data);
      } else {
        toast.error('Failed to fetch verifications');
      }
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast.error('Failed to fetch verifications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!confirm('Are you sure you want to approve this verification request?')) {
      return;
    }

    try {
      setActionLoading(id);
      const response = await fetch(`/api/admin/verifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Verification approved successfully');
        fetchVerifications();
      } else {
        toast.error(data.error || 'Failed to approve verification');
      }
    } catch (error) {
      console.error('Approve error:', error);
      toast.error('Failed to approve verification');
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (verification) => {
    setSelectedVerification(verification);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim() || rejectionReason.trim().length < 10) {
      toast.error('Rejection reason must be at least 10 characters');
      return;
    }

    try {
      setActionLoading(selectedVerification._id);
      const response = await fetch(`/api/admin/verifications/${selectedVerification._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'reject',
          rejectionReason: rejectionReason.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Verification rejected');
        setShowRejectModal(false);
        setSelectedVerification(null);
        setRejectionReason('');
        fetchVerifications();
      } else {
        toast.error(data.error || 'Failed to reject verification');
      }
    } catch (error) {
      console.error('Reject error:', error);
      toast.error('Failed to reject verification');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      idle: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Submitted' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig.idle;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seller Verifications</h1>
        <p className="text-gray-600 mt-1">Manage and review seller verification requests</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {['pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize ${
                filter === status
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Verifications List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : verifications.length === 0 ? (
        <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No {filter} verifications</h3>
          <p className="text-gray-500">There are no {filter} verification requests at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {verifications.map((verification) => (
            <div key={verification._id} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{verification.businessName}</h3>
                    {getStatusBadge(verification.verificationStatus)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Seller:</span> {verification.userId?.name}</p>
                    <p><span className="font-medium">Email:</span> {verification.userId?.email}</p>
                    <p><span className="font-medium">Phone:</span> {verification.userId?.phone}</p>
                    <p><span className="font-medium">Category:</span> {verification.category}</p>
                    <p><span className="font-medium">Location:</span> {verification.location}, {verification.district}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{verification.verificationMessage}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Documents ({verification.verificationDocuments?.length || 0}):</h4>
                <div className="flex flex-wrap gap-2">
                  {verification.verificationDocuments?.map((doc, index) => (
                    <a
                      key={index}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Document {index + 1}
                    </a>
                  ))}
                </div>
              </div>

              {verification.verificationStatus === 'rejected' && verification.rejectionReason && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</h4>
                  <p className="text-sm text-red-700">{verification.rejectionReason}</p>
                </div>
              )}

              <div className="flex space-x-3">
                {verification.verificationStatus !== 'approved' && (
                  <Button
                    onClick={() => handleApprove(verification._id)}
                    variant="primary"
                    disabled={actionLoading === verification._id}
                  >
                    {actionLoading === verification._id ? 'Processing...' : 'Approve'}
                  </Button>
                )}
                
                {verification.verificationStatus !== 'rejected' && (
                  <Button
                    onClick={() => openRejectModal(verification)}
                    variant="outline"
                    disabled={actionLoading === verification._id}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Verification</h3>
            <p className="text-sm text-gray-600 mb-4">Please provide a reason for rejecting this verification request:</p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Enter rejection reason (minimum 10 characters)..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
            />
            <p className="text-xs text-gray-500 mb-4">{rejectionReason.length} characters</p>

            <div className="flex space-x-3">
              <Button
                onClick={handleReject}
                variant="primary"
                disabled={actionLoading}
              >
                {actionLoading ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
              <Button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedVerification(null);
                  setRejectionReason('');
                }}
                variant="outline"
                disabled={actionLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
