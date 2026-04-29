import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Profile = ({ user }) => {
  return (
    <MainLayout>
      <Head title="Profile - EYELIT" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Photo */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input value={user.name} readOnly />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input value={user.email} readOnly />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input placeholder="Add phone number" />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button>
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Logout
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;