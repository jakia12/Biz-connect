/**
 * Payment Gateway Helper
 * Structure for bKash/Nagad/SSLCommerz integration
 * 
 * Setup Instructions:
 * For bKash:
 * 1. Get merchant account from bKash
 * 2. Add to .env.local:
 *    BKASH_APP_KEY=your_app_key
 *    BKASH_APP_SECRET=your_secret
 *    BKASH_USERNAME=your_username
 *    BKASH_PASSWORD=your_password
 *    BKASH_BASE_URL=https://tokenized.sandbox.bka.sh (use production URL in live)
 */

/**
 * Initialize Payment
 */
export async function initiatePayment(order) {
  const paymentData = {
    amount: order.totalAmount,
    orderNumber: order.orderId,
    currency: 'BDT',
    intent: 'sale',
    paymentMethod: order.paymentMethod, // 'bkash', 'nagad', 'card', 'cod'
  };

  // For Cash on Delivery
  if (order.paymentMethod === 'cash_on_delivery') {
    return {
      success: true,
      paymentStatus: 'pending',
      message: 'Order placed. Pay when delivered.',
    };
  }

  // For bKash
  if (order.paymentMethod === 'bkash') {
    try {
      // 1. Get token
      const tokenResponse = await fetch('/api/payment/bkash/token', {
        method: 'POST',
      });
      const { token } = await tokenResponse.json();

      // 2. Create payment
      const createResponse = await fetch('/api/payment/bkash/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          merchantInvoiceNumber: paymentData.orderNumber,
          intent: 'sale',
        }),
      });

      const createData = await createResponse.json();

      return {
        success: true,
        paymentUrl: createData.bkashURL,
        paymentID: createData.paymentID,
      };
    } catch (error) {
      console.error('bKash payment error:', error);
      return {
        success: false,
        error: 'Payment initiation failed',
      };
    }
  }

  // For Nagad (similar structure)
  if (order.paymentMethod === 'nagad') {
    // Implement Nagad flow
    console.log('Nagad payment flow - implement similar to bKash');
  }

  // For SSL Commerz (card payments)
  if (order.paymentMethod === 'card') {
    try {
      const response = await fetch('/api/payment/sslcommerz/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_amount: paymentData.amount,
          tran_id: paymentData.orderNumber,
          cus_name: order.buyerName,
          cus_email: order.buyerEmail,
        }),
      });

      const data = await response.json();
      
      return {
        success: true,
        paymentUrl: data.GatewayPageURL,
      };
    } catch (error) {
      console.error('SSL Commerz error:', error);
      return {
        success: false,
        error: 'Payment initiation failed',
      };
    }
  }

  return {
    success: false,
    error: 'Invalid payment method',
  };
}

/**
 * Verify Payment
 */
export async function verifyPayment(paymentID, paymentMethod) {
  if (paymentMethod === 'bkash') {
    try {
      const response = await fetch('/api/payment/bkash/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentID }),
      });

      const data = await response.json();

      return {
        success: data.transactionStatus === 'Completed',
        transactionId: data.trxID,
      };
    } catch (error) {
      return { success: false, error: 'Verification failed' };
    }
  }

  // Similar for other methods
  return { success: false };
}

/**
 * Payment Methods Configuration
 */
export const PAYMENT_METHODS = [
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    icon: '💵',
    description: 'Pay when you receive',
    available: true,
  },
  {
    id: 'bkash',
    name: 'bKash',
    icon: '🔴',
    description: 'Pay with bKash',
    available: false, // Set true after setup
  },
  {
    id: 'nagad',
    name: 'Nagad',
    icon: '🟠',
    description: 'Pay with Nagad',
    available: false,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Pay with card',
    available: false,
  },
];
