import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  
  return (
    <MainLayout>
      <Head title="Cart - EYELIT" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border flex items-center space-x-4">
                  <img
                    src={item.product.image || '/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">{item.product.brand}</p>
                    
                    {item.lens_details && (
                      <div className="text-sm text-gray-500 mt-1">
                        <p>Lens: {item.lens_details.type}</p>
                        {item.lens_details.prescription && (
                          <p>OD: {item.lens_details.prescription.od}, OS: {item.lens_details.prescription.os}</p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="w-8 h-8 rounded border">-</button>
                      <span>{item.quantity}</span>
                      <button className="w-8 h-8 rounded border">+</button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">Rp {item.total_price.toLocaleString('id-ID')}</p>
                    <button className="text-red-600 text-sm hover:text-red-800">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;