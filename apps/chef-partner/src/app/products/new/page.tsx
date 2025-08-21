'use client';

import { ProductFormData } from '@/application/products/schemas/form.schema';
import React from 'react';
import ProductForm from '@/application/products/components/ProductForm';
import { ProductService } from '@/services/product.service';

const productService = new ProductService();

const ProductFormPage: React.FC = () => {
  const handleSubmit = async (product: ProductFormData) => {
    return await productService.create(product);
  };

  return <ProductForm title="Novo produto" onSubmit={handleSubmit} />;
};

export default ProductFormPage;
