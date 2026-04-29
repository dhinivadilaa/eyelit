import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Checkout = ({ cartItems, addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || '');
  const [shippingMethod, setShippingMethod] = useState('jne');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shippingCost = 25000; // Fixed for demo
  const total = subtotal + shippingCost;
  
  return (
    <MainLayout>
      <Head title="Checkout - EYELIT" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image || '/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rp {item.total_price.toLocaleString('id-ID')}</p>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Address Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              
              {selectedAddress && (
                <div className="text-gray-700">
                  <p>{addresses.find(a => a.id === selectedAddress)?.address}</p>
                  <p>{addresses.find(a => a.id === selectedAddress)?.city}, {addresses.find(a => a.id === selectedAddress)?.province}</p>
                  <p>{addresses.find(a => a.id === selectedAddress)?.postal_code}</p>
                </div>
              )}
            </div>
            
            {/* Shipping Options */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              <div className="space-y-2">
                {[
                  { id: 'jne', name: 'JNE', cost: 25000 },
                  { id: 'jnt', name: 'J&T', cost: 25000 },
                  { id: 'sicepat', name: 'SiCepat', cost: 25000 }
                ].map((method) => (
                  <label key={method.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span>{method.name}</span>
                    </div>
                    <span>Rp {method.cost.toLocaleString('id-ID')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-2">
                {[
                  { id: 'qris', name: 'QRIS' },
                  { id: 'bca', name: 'Virtual Account BCA' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center p-3 border rounded">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>{method.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Pay Rp {total.toLocaleString('id-ID')}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;