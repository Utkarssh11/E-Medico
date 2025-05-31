import React from 'react';
import { Medicine, mockMedicines } from '../data/medicines'; // Using mock for now

interface CartPageProps {
  onNavigate: (page: 'checkout' | 'catalog') => void;
}

// Simulate a cart for demonstration
const mockCartItems = [
  { ...mockMedicines[0], quantity: 2 }, // Paracetamol
  { ...mockMedicines[2], quantity: 1 }, // Vitamin C
];

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const calculateSubtotal = () => {
    return mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const estimatedTax = subtotal * 0.05; // Example 5% tax
  const shippingFee = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + estimatedTax + shippingFee;

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    // Placeholder: In a real app, this would update state/context
    console.log(`Update item ${itemId} quantity to ${newQuantity}`);
    alert(`Simulated: Update ${itemId} quantity to ${newQuantity}. (Cart state not yet managed)`);
  };

  const handleRemoveItem = (itemId: string) => {
    // Placeholder
    console.log(`Remove item ${itemId}`);
    alert(`Simulated: Remove ${itemId}. (Cart state not yet managed)`);
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">Your Shopping Cart</h2>
      </div>

      {mockCartItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">Your cart is empty.</p>
          <p className="text-slate-500 dark:text-slate-500 mb-6">Looks like you haven't added any items yet.</p>
          <button onClick={() => onNavigate('catalog')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {mockCartItems.map(item => (
              <div key={item.id} className="card flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md border border-slate-200 dark:border-slate-700" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.brand}</p>
                  <p className="text-md font-medium text-primary-DEFAULT dark:text-primary-light mt-1">
                    {item.currency} {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                  <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >-</button>
                    <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value,10) || 1)}
                        className="w-12 text-center border-l border-r border-slate-300 dark:border-slate-600 bg-transparent focus:outline-none"
                        aria-label={`Quantity of ${item.name}`} 
                    />
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      aria-label={`Increase quantity of ${item.name}`}
                    >+</button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-danger-DEFAULT hover:text-danger-dark dark:text-danger-light dark:hover:text-danger-DEFAULT transition-colors text-sm"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 space-y-4 sticky top-24"> {/* Sticky for desktop */}
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                Order Summary
              </h3>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Estimated Tax (5%)</span>
                <span>USD {estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `USD ${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-white">
                  <span>Total</span>
                  <span>USD {total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('checkout')} 
                className="btn btn-primary w-full mt-4"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => onNavigate('catalog')} 
                className="btn btn-outline w-full mt-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
