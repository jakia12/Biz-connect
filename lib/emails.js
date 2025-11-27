/**
 * Email Helper Functions
 * Ready for Resend integration
 * 
 * Setup Instructions:
 * 1. Install: npm install resend
 * 2. Add to .env: RESEND_API_KEY=your_key_here
 * 3. Uncomment the Resend import and initialization
 */

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send Order Confirmation Email to Buyer
 */
export async function sendOrderConfirmationEmail(order, buyerEmail, buyerName) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi ${buyerName},</p>
          <p>Thank you for your order! We've received your order and will process it soon.</p>
          
          <div class="order-details">
            <h3>Order #${order.orderId}</h3>
            <p><strong>Total:</strong> ৳${order.totalAmount.toLocaleString()}</p>
            <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>

          <p><strong>Items Ordered:</strong></p>
          <ul>
            ${order.items.map(item => `
              <li>${item.title} - Qty: ${item.quantity} - ৳${(item.price * item.quantity).toLocaleString()}</li>
            `).join('')}
          </ul>

          <p><strong>Shipping Address:</strong><br>
          ${order.shippingAddress}</p>

          <a href="${process.env.NEXTAUTH_URL}/dashboard/buyer/orders/${order._id}" class="button">
            View Order Details
          </a>
        </div>
        <div class="footer">
          <p>BizConnect - Bangladesh's Leading B2B Marketplace</p>
          <p>If you have any questions, please contact us.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // For production with Resend:
    // await resend.emails.send({
    //   from: 'BizConnect <orders@bizconnect.com>',
    //   to: buyerEmail,
    //   subject: `Order Confirmation #${order.orderId}`,
    //   html: emailHtml,
    // });

    console.log(`[EMAIL] Order confirmation would be sent to: ${buyerEmail}`);
    console.log(`[EMAIL] Order ID: ${order.orderId}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

/**
 * Send New Order Notification to Seller
 */
export async function sendNewOrderEmailToSeller(order, sellerEmail, sellerName) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .button { background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Order Received!</h1>
        </div>
        <div class="content">
          <p>Hi ${sellerName},</p>
          <p>You have received a new order. Please process it as soon as possible.</p>
          
          <div class="order-details">
            <h3>Order #${order.orderId}</h3>
            <p><strong>Total:</strong> ৳${order.totalAmount.toLocaleString()}</p>
            <p><strong>Items:</strong> ${order.items.length}</p>
          </div>

          <a href="${process.env.NEXTAUTH_URL}/dashboard/seller/orders/${order._id}" class="button">
            View & Process Order
          </a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    console.log(`[EMAIL] New order notification would be sent to: ${sellerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

/**
 * Send Order Status Update Email
 */
export async function sendOrderStatusEmail(order, buyerEmail, buyerName, newStatus) {
  const statusMessages = {
    confirmed: 'Your order has been confirmed and is being prepared',
    processing: 'Your order is being processed',
    shipped: 'Your order has been shipped',
    delivered: 'Your order has been delivered',
    cancelled: 'Your order has been cancelled',
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; }
        .status-update { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #2563eb; }
        .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Status Update</h1>
        </div>
        <div class="content">
          <p>Hi ${buyerName},</p>
          
          <div class="status-update">
            <h3>Order #${order.orderId}</h3>
            <p style="font-size: 18px; color: #2563eb;">
              <strong>${statusMessages[newStatus]}</strong>
            </p>
            ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
          </div>

          <a href="${process.env.NEXTAUTH_URL}/dashboard/buyer/orders/${order._id}" class="button">
            Track Your Order
          </a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    console.log(`[EMAIL] Status update (${newStatus}) would be sent to: ${buyerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}
