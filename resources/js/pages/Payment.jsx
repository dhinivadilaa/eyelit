import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

const Payment = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <MainLayout>
      <Head title="Payment - EYELIT" />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <h1 className="text-2xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-gray-600 mb-6">Order #{order.order_number}</p>
          
          {/* Countdown Timer */}
          <div className="mb-6">
            <div className="text-3xl font-mono font-bold text-red-600 mb-2">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-gray-500">Time remaining to complete payment</p>
          </div>
          
          {/* Payment Instructions */}
          <div className="mb-6">
            {order.payment_method === 'qris' ? (
              <div>
                <h3 className="font-semibold mb-4">Scan QR Code</h3>
                <div className="bg-gray-100 w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">QR Code Placeholder</span>
                </div>
                <p className="text-sm text-gray-600">Scan with your e-wallet app</p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-4">Virtual Account BCA</h3>
                <div className="bg-gray-100 p-4 rounded mb-4">
                  <p className="text-2xl font-mono font-bold text-center">1234567890123456</p>
                </div>
                <p className="text-sm text-gray-600">Transfer to this account number</p>
              </div>
            )}
          </div>
          
          {/* Amount */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Total Payment</p>
            <p className="text-3xl font-bold text-blue-600">Rp {order.total.toLocaleString('id-ID')}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1">
              Already Paid
            </Button>
            <Button variant="outline" className="flex-1">
              Cancel Order
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Payment will be verified automatically. Please complete payment within the time limit.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;