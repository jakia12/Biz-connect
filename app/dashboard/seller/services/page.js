'use client';

import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // or your toast library

/**
 * Seller Services Page
 */
export default function SellerServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ all: 0, draft: 0, active: 0, paused: 0 });
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    serviceId: null
  });

  useEffect(() => {
    fetchServices();
  }, [selectedStatus]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/seller/services?status=${selectedStatus}`);
      const data = await response.json();

      if (data.success) {
        setServices(data.services);
        setStats(data.stats);
      } else {
        toast.error(data.error || 'Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({
      isOpen: true,
      serviceId: id
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.serviceId) return;

    try {
      const response = await fetch(`/api/seller/services/${deleteModal.serviceId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Service deleted successfully');
        fetchServices();
      } else {
        toast.error(data.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    } finally {
      setDeleteModal({ isOpen: false, serviceId: null });
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    try {
      const response = await fetch(`/api/seller/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Service ${newStatus === 'active' ? 'activated' : 'paused'}`);
        fetchServices();
      } else {
        toast.error(data.error || 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings</p>
        </div>
        <Link href="/dashboard/seller/services/add">
          <Button variant="primary" className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Service
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'All Services', value: stats.all, status: 'all', color: 'blue' },
          { label: 'Active', value: stats.active, status: 'active', color: 'green' },
          { label: 'Drafts', value: stats.draft, status: 'draft', color: 'yellow' },
          { label: 'Paused', value: stats.paused, status: 'paused', color: 'gray' }
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setSelectedStatus(stat.status)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedStatus === stat.status
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
          <p className="text-gray-600 mb-4">Create your first service to start selling</p>
          <Link href="/dashboard/seller/services/add">
            <Button variant="primary">Create Service</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Cover Image */}
              <div className="relative h-40 bg-gray-200">
                {service.coverImage && (
                  <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    service.status === 'active' ? 'bg-green-100 text-green-700' :
                    service.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.category}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {service.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {service.orders || 0}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Starting at</p>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, serviceId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete Service"
        type="danger"
      />
    </div>
  );
}