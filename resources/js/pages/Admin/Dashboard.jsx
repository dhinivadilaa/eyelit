import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

const AdminDashboard = ({ stats }) => {
  return (
    <MainLayout>
      <Head title="Admin Dashboard - EYELIT" />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Total Revenue</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                Rp {stats.totalRevenue?.toLocaleString('id-ID') || '0'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Orders Today</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {stats.ordersToday || 0}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Total Orders</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalOrders || 0}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Total Users</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalUsers || 0}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Orders</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample order items - replace with actual data */}
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order #001</p>
                  <p className="text-sm text-gray-600">John Doe - 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp 450.000</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order #002</p>
                  <p className="text-sm text-gray-600">Jane Smith - 1 item</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp 250.000</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;