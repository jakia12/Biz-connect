'use client';

import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useDeleteServiceMutation, useGetSellerServicesQuery, useUpdateServiceMutation } from '@/lib/redux/features/servicesApi';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Seller Services Page
 */
export default function SellerServices() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // RTK Query hooks
  const { data: servicesData, isLoading: loading } = useGetSellerServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  
  const services = servicesData?.services || [];
  
  // Calculate stats
  const stats = {
    all: services.length,
    active: services.filter(s => s.status === 'active').length,
    draft: services.filter(s => s.status === 'draft').length,
    paused: services.filter(s => s.status === 'paused').length
  };

  // Filter services based on selected status
  const filteredServices = selectedStatus === 'all' 
    ? services 
    : services.filter(s => s.status === selectedStatus);
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    serviceId: null
  });

  const handleDeleteClick = (id) => {
    setDeleteModal({
      isOpen: true,
      serviceId: id
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.serviceId) return;

    try {
      await deleteService(deleteModal.serviceId).unwrap();
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(error?.data?.error || 'Failed to delete service');
    } finally {
      setDeleteModal({ isOpen: false, serviceId: null });
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    try {
      await updateService({ id, status: newStatus }).unwrap();
      toast.success(`Service ${newStatus === 'active' ? 'activated' : 'paused'}`);
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error(error?.data?.error || 'Failed to update service');
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
      ) : filteredServices.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600 mb-4">
            {selectedStatus === 'all' 
              ? "Create your first service to start selling" 
              : `No ${selectedStatus} services found`}
          </p>
          {selectedStatus === 'all' && (
            <Link href="/dashboard/seller/services/add">
              <Button variant="primary">Create Service</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              {/* Cover Image */}
              <div className="relative h-40 bg-gray-200">
                {service.images && service.images[0] ? (
                  <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    service.status === 'active' ? 'bg-green-100 text-green-700' :
                    service.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 h-12">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.category}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1" title="Views">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {service.views || 0}
                  </span>
                  <span className="flex items-center gap-1" title="Orders">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {service.orders || 0}
                  </span>
                  <span className="flex items-center gap-1" title="Rating">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {service.rating || 0}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Starting at</p>
                  <p className="text-lg font-bold text-primary">
                    ৳{service.packages?.[0]?.price || 0}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center gap-2">
                  <Link href={`/dashboard/seller/services/edit/${service._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                  </Link>
                  <button 
                    onClick={() => handleToggleStatus(service._id, service.status)}
                    className={`p-2 rounded-lg border transition-colors ${
                      service.status === 'active' 
                        ? 'border-yellow-200 text-yellow-600 hover:bg-yellow-50' 
                        : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}
                    title={service.status === 'active' ? 'Pause Service' : 'Activate Service'}
                  >
                    {service.status === 'active' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(service._id)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Service"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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