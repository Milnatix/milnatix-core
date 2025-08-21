'use client';

import ProductForm from '@/application/products/components/ProductForm';
import { ProductFormData } from '@/application/products/schemas/form.schema';
import { ProductService } from '@/services/product.service';
import { use, useEffect, useState } from 'react';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

const productService = new ProductService();

const EditProductPage: React.FC<EditProductPageProps> = ({ params }) => {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const result = await productService.getDetails(id);
      if (result.success) {
        const product = result.value;
        setInitialData({
          name: product.name,
          description: product.description,
          salePrice: product.salePrice,
          costPrice: product.costPrice,
        });
      }
    };

    void getProductDetails();
  }, [id]);

  const handleUpdate = (data: ProductFormData) =>
    productService.update(id, data);

  return (
    <ProductForm
      title="Editar Produto"
      onSubmit={handleUpdate}
      productInitialData={initialData}
      loading={!initialData}
    />
  );
};

export default EditProductPage;
