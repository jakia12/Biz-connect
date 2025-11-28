"use client";

import ServiceForm from '@/components/seller/ServiceForm';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function AddServicePage() {
  const router = useRouter();

  const handleSubmit = async (serviceData) => {
    try {
      const response = await fetch('/api/seller/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Response status:', response.status);

      if (data.success) {
        toast.success('Service created successfully!');
        router.push('/dashboard/seller/services');
      } else {
        console.error('Service creation failed:', data);
        toast.error(data.error || 'Failed to create service');
        if (data.details) {
          console.error('Error details:', data.details);
          toast.error(`Details: ${data.details}`);
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to create service');
    }
  };

  return (
    <div className="p-6">
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  );
}
