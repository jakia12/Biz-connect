'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod', // Cash on Delivery default
  });

  useEffect(() => {
    if (cart && cart.items.length === 0) {
      toast.error('Your cart is empty');
      router.push('/products');
    }
  }, [cart, router]);

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
      // Filter out items with null productId before submitting
      const validItems = cart.items.filter(item => item.productId && item.productId._id);
      
      if (validItems.length === 0) {
        toast.error('Your cart has no valid items');
        setLoading(false);
        return;
      }

      if (validItems.length < cart.items.length) {
        toast.error('Some items are no longer available and will be skipped');
      }

      // Validate form data manually to ensure no empty fields
      const requiredFields = ['fullName', 'phone', 'address', 'city', 'postalCode'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required shipping fields');
        setLoading(false);
        return;
      }

      // Create order API call
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            addressLine1: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          paymentMethod: formData.paymentMethod,
          items: validItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: cart.total + 50 + (cart.total * 0.05) // Total + Shipping + Tax
        }),
      });

      let data;
      try {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse response:', text);
          throw new Error('Server returned invalid response');
        }
      } catch (e) {
        console.error('Response processing error:', e);
        throw new Error('Failed to process server response');
      }

      if (response.ok && data.success) {
        toast.success('Order placed successfully!');
        console.log('[Checkout] Clearing cart...');
        const cartCleared = await clearCart();
        console.log('[Checkout] Cart cleared:', cartCleared);
        if (!cartCleared) {
          console.warn('[Checkout] Cart clearing failed, but order was successful');
        }
        router.push(`/orders/${data.order._id}`);
      } else {
        console.error('Order error:', data);
        let details = data.details;
        if (Array.isArray(details)) {
          details = details.join(', ');
        }
        const errorMsg = details ? `${data.error}: ${details}` : data.error;
        toast.error(errorMsg || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return null; // Redirecting in useEffect
  }

  const subtotal = cart.total || 0;
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
                  {cart.items.map((item) => {
                    // Skip items with null productId
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
                  })}
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
