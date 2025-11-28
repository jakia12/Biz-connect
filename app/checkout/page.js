'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { useClearCartMutation, useGetCartQuery } from '@/lib/redux/features/cartApi';
import { useCreateOrderMutation } from '@/lib/redux/features/ordersApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  
  // RTK Query hooks
  const { data: cartData } = useGetCartQuery();
  const [clearCart] = useClearCartMutation();
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();
  
  const cart = cartData?.cart;
  
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
  });

  // Fetch service if serviceId is present
  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`);
      const data = await response.json();
      
      if (data.success) {
        setService(data.service);
        // Auto-select basic package
        if (data.service.packages && data.service.packages.length > 0) {
          setSelectedPackage(data.service.packages[0]);
        }
      } else {
        toast.error('Service not found');
        router.push('/services');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      toast.error('Failed to load service');
      router.push('/services');
    }
  };

  // Redirect if cart is empty AND no serviceId
  useEffect(() => {
    if (!serviceId && cart && cart.items.length === 0) {
      toast.error('Your cart is empty');
      router.push('/products');
    }
  }, [cart, router, serviceId]);

  // Fetch user profile to auto-fill shipping address
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        
        if (data.success && data.user) {
          setFormData(prev => ({
            ...prev,
            fullName: data.user.name || '',
            phone: data.user.phone || '',
            address: data.user.businessAddress || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const requiredFields = ['fullName', 'phone', 'address', 'city', 'postalCode'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required shipping fields');
        setLoading(false);
        return;
      }

      const shippingAddress = {
        fullName: formData.fullName,
        phone: formData.phone,
        addressLine1: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      };

      // Handle SERVICE order
      if (serviceId && service && selectedPackage) {
        const response = await fetch('/api/service-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceId: service._id,
            packageId: selectedPackage._id,
            shippingAddress,
            paymentMethod: formData.paymentMethod,
            requirements: {} // Can be extended later
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success('Service order placed successfully!');
          router.push(`/dashboard/buyer/orders`);
        } else {
          toast.error(data.error || 'Failed to place service order');
        }
        return;
      }

      // Handle PRODUCT order (existing logic)
      const validItems = cart.items.filter(item => item.productId && item.productId._id);
      
      if (validItems.length === 0) {
        toast.error('Your cart has no valid items');
        setLoading(false);
        return;
      }

      if (validItems.length < cart.items.length) {
        toast.error('Some items are no longer available and will be skipped');
      }

      const orderData = {
        shippingAddress,
        paymentMethod: formData.paymentMethod,
        items: validItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cart.total + 50 + (cart.total * 0.05)
      };

      const result = await createOrder(orderData).unwrap();

      if (result.success) {
        toast.success('Order placed successfully!');
        // Cart is automatically cleared by RTK Query invalidation
        router.push(`/orders/${result.order._id}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMsg = error?.data?.error || error.message || 'Something went wrong. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Don't show anything while redirecting
  if (!serviceId && (!cart || cart.items.length === 0)) {
    return null;
  }

  // Calculate totals based on order type
  const isServiceOrder = serviceId && service && selectedPackage;
  const subtotal = isServiceOrder ? selectedPackage.price : (cart?.total || 0);
  const shipping = 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Shipping Information</h2>
                
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="+880 1xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Street address, apartment, suite, etc."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Dhaka"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="1200"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-900">Payment Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-primary bg-primary/5 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary focus:ring-primary"
                        />
                        <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-not-allowed opacity-60">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          disabled
                          className="w-5 h-5 text-gray-400"
                        />
                        <span className="ml-3 font-medium text-gray-500">Online Payment (Coming Soon)</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 sticky top-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {isServiceOrder ? (
                    // Service Order Summary
                    <div className="border-b border-gray-100 pb-4">
                      <div className="font-medium text-gray-900 mb-2">{service.title}</div>
                      <div className="text-sm text-gray-600 mb-3">{service.category}</div>
                      
                      {/* Package Selection */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Select Package:</p>
                        {service.packages.map((pkg) => (
                          <button
                            key={pkg._id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              selectedPackage?._id === pkg._id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-900">{pkg.name}</p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {pkg.deliveryTime} • {pkg.revisions} revisions
                                </p>
                              </div>
                              <p className="font-bold text-primary">৳{pkg.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Product Order Summary
                    cart?.items.map((item) => {
                      if (!item.productId) return null;
                      
                      return (
                        <div key={item.productId._id} className="flex gap-4 text-sm">
                          <div className="font-medium text-gray-900 flex-1">
                            {item.quantity} x {item.productId?.title || 'Unknown Product'}
                          </div>
                          <div className="text-gray-600">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>৳{shipping}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>৳{tax.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary">৳{total.toFixed(0)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mt-8 py-4 text-lg"
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Loading component for Suspense fallback
function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Wrap with Suspense to handle useSearchParams
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
