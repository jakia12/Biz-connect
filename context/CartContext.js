'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, productData = null) => {
    // Optimistic update
    const previousCart = cart;
    
    if (productData) {
      const newCart = { ... (cart || { items: [], total: 0, itemCount: 0 }) };
      
      // Check if item exists
      const existingItemIndex = newCart.items.findIndex(
        item => item.productId._id === productId || item.productId === productId
      );

      if (existingItemIndex > -1) {
        toast.error('Item already in cart');
        return false;
      }

      // Add new item
      newCart.items = [
        ...newCart.items,
        {
          productId: { _id: productId, ...productData },
          quantity,
          price: productData.price
        }
      ];

      // Recalculate totals
      newCart.itemCount = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
      newCart.total = newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      setCart(newCart);
    }

    try {
      // Check if item exists in current state before API call to be safe
      const exists = cart?.items?.some(item => 
        item.productId._id === productId || item.productId === productId
      );
      
      if (exists) {
        toast.error('Item already in cart');
        return false;
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        toast.success('Added to cart');
        return true;
      } else {
        setCart(previousCart); // Revert on error
        toast.error(data.error || 'Failed to add to cart');
        return false;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCart(previousCart); // Revert on error
      toast.error('Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        return true;
      } else {
        toast.error(data.error || 'Failed to update cart');
        return false;
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        toast.success('Item removed');
        return true;
      } else {
        toast.error(data.error || 'Failed to remove item');
        return false;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart', { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        return true;
      } else {
        console.error('Failed to clear cart:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
