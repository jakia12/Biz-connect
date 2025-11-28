'use client';

import ServiceForm from '@/components/seller/ServiceForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditServicePage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setServiceId(id);

        const response = await fetch(`/api/seller/services/${id}`);
        const data = await response.json();

        if (data.success) {
          setServiceData(data.service);
        } else {
          toast.error('Service not found');
          router.push('/dashboard/seller/services');
        }
      } catch (error) {
        console.error('Error loading service:', error);
        toast.error('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [params, router]);

  const handleSubmit = async (updatedData) => {
    try {
      const response = await fetch(`/api/seller/services/${serviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Service updated successfully!');
        router.push('/dashboard/seller/services');
      } else {
        toast.error(data.error || 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="p-6">
        <ServiceForm 
          initialData={serviceData} 
          onSubmit={handleSubmit} 
          isEditing={true} 
        />
      </div>
  );
}
