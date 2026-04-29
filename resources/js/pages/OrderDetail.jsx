import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const OrderDetail = ({ order }) => {
  const getStatusColor = (status) => {
    const colors = {
      waiting: 'warning',
      packed: 'primary',
      shipped: 'primary',
      delivered: 'success',
      completed: 'success'
    };
    return colors[status] || 'default';
  };
  
  const getStatusText = (status) => {
    const texts = {
      waiting: 'Waiting for Payment',
      packed: 'Packed',
      shipped: 'Shipped',
      delivered: 'Delivered',
      completed: 'Completed'
    };
    return texts[status] || status;
  };
  
  return (
    <MainLayout>
      <Head title={`Order ${order.order_number} - EYELIT`} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-gray-600">Order #{order.order_number}</p>
        </div>
        
        {/* Order Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Order Status</h2>
            <Badge variant={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline">
              Track Order
            </Button>
            {order.status === 'delivered' && (
              <Button>
                Confirm Receipt
              </Button>
            )}
            {order.status === 'completed' && (
              <Button variant="outline">
                Write Review
              </Button>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                <img
                  src={item.product.image || '/placeholder.jpg'}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">{item.product.brand}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  
                  {item.lens_details && (
                    <div className="text-xs text-gray-500 mt-1">
                      <p>Lens configuration included</p>
                    </div>
                  )}
                </div>
                <p className="font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
        
        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-3">Shipping Information</h3>
            <p className="text-gray-700">{order.shipping_address}</p>
            <p className="text-gray-700 mt-2">Method: {order.shipping_method}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-3">Payment Information</h3>
            <p className="text-gray-700">Method: {order.payment_method}</p>
            <p className="text-gray-700">Status: {order.payment_status}</p>
            {order.paid_at && (
              <p className="text-gray-700">Paid at: {new Date(order.paid_at).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetail;