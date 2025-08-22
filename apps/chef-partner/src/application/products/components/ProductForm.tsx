'use client';

import {
  productFormSchema,
  ProductFormData,
} from '@/application/products/schemas/form.schema';
import Input from '@/components/atom/Input';
import FormTemplate from '@/components/template/FormTemplate';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextArea from '@/components/atom/TextArea';
import { useAlertStore } from '@/shared/stores/alert.store';
import { SummaryProductResponseDTO } from '@milnatix-core/dtos';
import { Result } from '@/shared/types/Result.type';

interface ProductFormProps {
  title: string;
  onSubmit: (
    product: ProductFormData,
  ) => Promise<
    Result<SummaryProductResponseDTO, { message: string; status?: number }>
  >;
  productInitialData?: ProductFormData | null;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  title,
  onSubmit,
  productInitialData,
  loading,
}) => {
  const router = useRouter();
  const { showAlert } = useAlertStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: 'onSubmit',
    defaultValues: productInitialData || {
      salePrice: 0,
      costPrice: null,
    },
  });

  useEffect(() => {
    if (productInitialData) {
      reset(productInitialData);
    }
  }, [productInitialData, reset]);

  const goToProductsList = () => router.replace('/products');

  const handleFormSubmit = handleSubmit(async (data) => {
    const result = await onSubmit(data);

    if (!result.success) {
      showAlert({
        title: 'Atenção!',
        message: result.error.message,
        type: 'error',
        duration: 10000,
      });
      return;
    }

    goToProductsList();
  });

  return (
    <FormTemplate
      title={title}
      onCancel={goToProductsList}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      loading={loading}
    >
      <Input
        label="Nome (*)"
        autoFocus
        {...register('name')}
        error={errors.name?.message}
      />
      <TextArea
        label="Descrição"
        {...register('description')}
        error={errors.description?.message}
      />
      <Input
        label="Preço (*)"
        type="number"
        {...register('salePrice', { valueAsNumber: true })}
        error={errors.salePrice?.message}
        step="0.01"
      />
      <Input
        label="Preço de custo"
        type="number"
        {...register('costPrice', { valueAsNumber: true })}
        error={errors.costPrice?.message}
        step="0.01"
      />
    </FormTemplate>
  );
};

export default ProductForm;
