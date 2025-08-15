'use client';

import { create } from '@/application/products/facades/product.facade';
import { ProductFormData } from '@/application/products/schemas/form.schema';
import React from 'react';
import ProductForm from '@/application/products/components/ProductForm';

const ProductFormPage: React.FC = () => {
  const handleSubmit = async (product: ProductFormData) => {
    return await create(product);
  };

  return <ProductForm title="Novo produto" onSubmit={handleSubmit} />;
};

export default ProductFormPage;
