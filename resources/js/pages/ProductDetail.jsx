import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProductDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState('frame'); // 'frame' or 'frame+lens'
  const [lensType, setLensType] = useState(''); // minus or plus
  const [odSphere, setOdSphere] = useState('');
  const [odCylinder, setOdCylinder] = useState('');
  const [osSphere, setOsSphere] = useState('');
  const [osCylinder, setOsCylinder] = useState('');
  const [antiRadiation, setAntiRadiation] = useState(false);
  const [photochromic, setPhotochromic] = useState(false);
  
  const calculatePrice = () => {
    let basePrice = product.price;
    if (purchaseType === 'frame+lens') {
      basePrice += 50000; // Additional for lens
      if (antiRadiation) basePrice += 150000;
      if (photochromic) basePrice += 200000;
    }
    return basePrice;
  };
  
  const images = product.images || [product.image || '/placeholder.jpg'];
  
  return (
    <MainLayout>
      <Head title={`${product.name} - EYELIT`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
            
            {/* Purchase Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Purchase Option</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="purchaseType"
                    value="frame"
                    checked={purchaseType === 'frame'}
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  Frame Only - Rp {product.price.toLocaleString('id-ID')}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="purchaseType"
                    value="frame+lens"
                    checked={purchaseType === 'frame+lens'}
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  Frame + Lens - Rp {(product.price + 50000).toLocaleString('id-ID')}
                </label>
              </div>
            </div>
            
            {/* Lens Configuration */}
            {purchaseType === 'frame+lens' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-4">Lens Configuration</h3>
                
                {/* Step 1: Lens Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Step 1: Lens Type</label>
                  <select
                    value={lensType}
                    onChange={(e) => setLensType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select type</option>
                    <option value="minus">Minus (-)</option>
                    <option value="plus">Plus (+)</option>
                  </select>
                </div>
                
                {/* Step 2: Prescription */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Step 2: Prescription</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Right Eye (OD)</label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Sphere"
                          value={odSphere}
                          onChange={(e) => setOdSphere(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Cylinder"
                          value={odCylinder}
                          onChange={(e) => setOdCylinder(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Left Eye (OS)</label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Sphere"
                          value={osSphere}
                          onChange={(e) => setOsSphere(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Cylinder"
                          value={osCylinder}
                          onChange={(e) => setOsCylinder(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3: Additional Features */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Step 3: Additional Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={antiRadiation}
                        onChange={(e) => setAntiRadiation(e.target.checked)}
                        className="mr-2"
                      />
                      Anti Radiation (+Rp 150.000)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={photochromic}
                        onChange={(e) => setPhotochromic(e.target.checked)}
                        className="mr-2"
                      />
                      Photochromic (+Rp 200.000)
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Price Display */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                Rp {calculatePrice().toLocaleString('id-ID')}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>
            
            {/* Product Details */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bridge:</span>
                  <span>{product.specifications?.bridge || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{product.specifications?.size || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>{product.material || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color:</span>
                  <span>{product.color || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shape:</span>
                  <span>{product.shape || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;