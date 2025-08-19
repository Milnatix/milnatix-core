'use client';

import ProductForm from '@/application/products/components/ProductForm';
import {
  getDetails,
  update,
} from '@/application/products/facades/product.facade';
import { ProductFormData } from '@/application/products/schemas/form.schema';
import { use, useEffect, useState } from 'react';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ params }) => {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getDetails(id);
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

    void getProducts();
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
