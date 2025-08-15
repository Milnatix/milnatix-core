import { list } from '@/application/products/facades/product.facade';
import React from 'react';
import ProductPageClient from './ProductPageClient';

export const ProductPage: React.FC = async () => {
  const result = await list();

  if (!result.success) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>{result.error.message}</p>
      </div>
    );
  }

  return <ProductPageClient products={result.value} />;
};

export default ProductPage;
