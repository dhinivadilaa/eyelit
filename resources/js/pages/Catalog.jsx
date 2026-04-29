import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Catalog = ({ products, filters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <MainLayout>
      <Head title="Catalog - EYELIT" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="flex gap-8">
          {/* Filter Panel */}
          <div className={`w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              {/* Brand */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <Input placeholder="Search brand..." />
              </div>
              
              {/* Gender */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="space-y-2">
                  {['Pria', 'Wanita', 'Unisex'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <Input placeholder="Enter color..." />
              </div>
              
              {/* Material */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <Input placeholder="Enter material..." />
              </div>
              
              {/* Shape */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
                <Input placeholder="Enter shape..." />
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Catalog</h1>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                Filters
              </Button>
            </div>
            
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Catalog;