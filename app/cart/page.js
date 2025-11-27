/**
 * Shopping Cart Page
 * View and manage cart items - Connected to API
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.success) {
        // Filter out items with null productId (deleted products)
        const validItems = data.cart.items.filter(item => item.productId !== null);
        const invalidCount = data.cart.items.length - validItems.length;
        
        if (invalidCount > 0) {
          toast.error(`${invalidCount} unavailable item(s) removed from cart`);
          // Update cart with only valid items
          setCart({
            ...data.cart,
            items: validItems,
            itemCount: validItems.length,
            total: validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        } else {
          setCart(data.cart);
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(true);
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        toast.success('Cart updated');
      } else {
        toast.error(data.error || 'Failed to update');
      }
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        toast.success('Item removed');
      } else {
        toast.error(data.error || 'Failed to remove');
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!confirm('Clear entire cart?')) return;

    try {
      const response = await fetch('/api/cart', { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        toast.success('Cart cleared');
      }
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const proceedToCheckout = () => {
    // Store cart in session/local storage for checkout
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Navbar />
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {isEmpty ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <Link href="/products">
                <Button variant="primary">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Cart Items ({cart.itemCount})</h2>
                    <button onClick={clearCart} className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Clear Cart
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cart.items.map((item) => {
                      // Skip items with null productId
                      if (!item.productId) return null;
                      
                      return (
                      <div key={item._id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productId?.images?.[0] || 'https://via.placeholder.com/150'}
                            alt={item.productId?.title || 'Product'}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.productId?.title}</h3>
                          <p className="text-primary font-bold mb-2">৳{item.price.toLocaleString()}</p>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                disabled={updating || item.quantity <= 1}
                                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                −
                              </button>
                              <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                disabled={updating || item.quantity >= (item.productId?.stock || 0)}
                                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.productId._id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 sticky top-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.itemCount} items)</span>
                      <span>৳{cart.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>৳50</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (5%)</span>
                      <span>৳{(cart.total * 0.05).toFixed(0)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ৳{(cart.total + 50 + cart.total * 0.05).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full mb-3"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
