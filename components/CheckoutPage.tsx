import React, { useState } from 'react';

const CheckoutPage: React.FC = () => {
  // Dummy state for form fields - replace with actual form handling (e.g., react-hook-form)
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // 'creditCard', 'paypal', etc.
  const [pickupOption, setPickupOption] = useState('delivery'); // 'delivery' or 'pickup'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for order submission logic
    console.log('Order Submitted:', { deliveryAddress, paymentMethod, pickupOption });
    alert('Order submitted successfully! (Simulated)');
  };

  // Simulated order summary (in a real app, this would come from cart context/state)
  const orderSummary = {
    subtotal: 58.73,
    tax: 2.94,
    shipping: 0.00,
    total: 61.67,
    items: [
      { id: 'med001', name: 'Paracetamol 500mg', quantity: 2, price: 5.99 },
      { id: 'med003', name: 'Vitamin C 1000mg', quantity: 1, price: 8.75 },
      { id: 'med005', name: 'Loratadine 10mg', quantity: 3, price: 9.99},
    ]
  };


  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">Checkout</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Review your order and complete your purchase.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery/Pickup Options */}
          <section className="card p-6">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-4">Delivery Options</h3>
            <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md hover:border-primary-DEFAULT dark:hover:border-primary-light cursor-pointer transition-colors">
                    <input type="radio" name="pickupOption" value="delivery" checked={pickupOption === 'delivery'} onChange={(e) => setPickupOption(e.target.value)} className="form-radio text-primary-DEFAULT" />
                    <span className="ml-3 text-slate-700 dark:text-slate-200">Home Delivery</span>
                </label>
                <label className="flex items-center p-3 border rounded-md hover:border-primary-DEFAULT dark:hover:border-primary-light cursor-pointer transition-colors">
                    <input type="radio" name="pickupOption" value="pickup" checked={pickupOption === 'pickup'} onChange={(e) => setPickupOption(e.target.value)} className="form-radio text-primary-DEFAULT" />
                    <span className="ml-3 text-slate-700 dark:text-slate-200">Store Pickup (Select Pharmacy)</span>
                </label>
            </div>
          </section>
          
          {pickupOption === 'delivery' && (
            <section className="card p-6">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-4">Delivery Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input type="text" name="fullName" id="fullName" value={deliveryAddress.fullName} onChange={handleInputChange} className="input-field mt-1" required />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input type="tel" name="phoneNumber" id="phoneNumber" value={deliveryAddress.phoneNumber} onChange={handleInputChange} className="input-field mt-1" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Address Line 1</label>
                  <input type="text" name="addressLine1" id="addressLine1" value={deliveryAddress.addressLine1} onChange={handleInputChange} className="input-field mt-1" required />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                  <input type="text" name="city" id="city" value={deliveryAddress.city} onChange={handleInputChange} className="input-field mt-1" required />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">ZIP / Postal Code</label>
                  <input type="text" name="zipCode" id="zipCode" value={deliveryAddress.zipCode} onChange={handleInputChange} className="input-field mt-1" required />
                </div>
              </div>
            </section>
          )}

          <section className="card p-6">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-4">Payment Method</h3>
            {/* Placeholder for payment method selection (Stripe Elements, etc.) */}
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-md hover:border-primary-DEFAULT dark:hover:border-primary-light cursor-pointer transition-colors">
                <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio text-primary-DEFAULT" />
                <span className="ml-3 text-slate-700 dark:text-slate-200">Credit/Debit Card</span>
              </label>
              {paymentMethod === 'creditCard' && (
                <div className="pl-8 space-y-3 mt-2 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Secure payment integration (e.g., Stripe, Razorpay) will appear here.</p>
                  {/* Example card fields (not functional) */}
                  <input type="text" placeholder="Card Number" className="input-field" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="input-field" />
                    <input type="text" placeholder="CVC" className="input-field" />
                  </div>
                </div>
              )}
              <label className="flex items-center p-3 border rounded-md hover:border-primary-DEFAULT dark:hover:border-primary-light cursor-pointer transition-colors">
                <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio text-primary-DEFAULT" />
                <span className="ml-3 text-slate-700 dark:text-slate-200">PayPal</span>
              </label>
               <label className="flex items-center p-3 border rounded-md hover:border-primary-DEFAULT dark:hover:border-primary-light cursor-pointer transition-colors">
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio text-primary-DEFAULT" />
                <span className="ml-3 text-slate-700 dark:text-slate-200">Cash on Delivery (COD)</span>
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 space-y-4 sticky top-24"> {/* Sticky for desktop */}
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {orderSummary.items.map(item => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="text-slate-700 dark:text-slate-200 font-medium">{item.name}</p>
                    <p className="text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">USD {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
             <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Subtotal</span>
                    <span>USD {orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Tax</span>
                    <span>USD {orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Shipping</span>
                    <span>{orderSummary.shipping === 0 ? 'FREE' : `USD ${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
             </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-white">
                <span>Total</span>
                <span>USD {orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-6">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
