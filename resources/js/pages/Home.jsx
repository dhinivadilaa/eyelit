import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';

const Home = ({ products }) => {
  return (
    <MainLayout>
      <Head title="EYELIT - Modern Eyewear" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern Eyewear for
            <span className="text-blue-600"> Modern Lifestyles</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect eyewear that combines style, comfort, and protection for your daily adventures.
          </p>
          <Button size="lg">
            Shop Now
          </Button>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Explore our curated collection of premium eyewear</p>
          </div>
          
          <ProductGrid products={products} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;