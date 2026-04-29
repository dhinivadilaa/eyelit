import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="danger" className="text-white">
              Stok Habis
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
          <span className="text-sm text-gray-600">{product.brand}</span>
        </div>
        
        <p className="text-xl font-bold text-blue-600 mb-4">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        
        <Link
          href={`/product/${product.id}`}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
        >
          Lihat Detail
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;