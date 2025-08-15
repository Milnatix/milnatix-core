'use client';

import ProductForm from '@/application/products/components/ProductForm';
import { getDetails, update } from '@/application/products/facades/product.facade';
import { ProductFormData } from '@/application/products/schemas/form.schema';
import { use, useEffect, useState } from 'react';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ params }) => {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    getDetails(id).then((result) => {
      if (!result.success) {
        return;
      }
      const product = result.value;
      setInitialData({
        name: product.name,
        description: product.description,
        salePrice: product.salePrice,
        costPrice: product.costPrice,
      });
    });
  }, [id]);

  const handleUpdate = (data: ProductFormData) => update(id, data);

  return (
    <ProductForm
      title="Editar Produto"
      onSubmit={handleUpdate}
      initialData={initialData}
      loading={!initialData}
    />
  );
};

export default EditProductPage;
