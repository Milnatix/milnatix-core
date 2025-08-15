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
import { FormProductResponseDTO } from "@milnatix-core/dtos";
import { Result } from '@/shared/types/Result.type';

interface ProductFormProps {
  title: string;
  onSubmit: (
    product: ProductFormData,
  ) => Promise<Result<FormProductResponseDTO, Error>>;
  initialData?: ProductFormData | null;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  title,
  onSubmit,
  initialData,
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
    defaultValues: initialData || {
      salePrice: 0,
      costPrice: null,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = handleSubmit(async (data) => {
    const result = await onSubmit(data);
    console.log('create result:', result);

    if (!result.success) {
      showAlert({
        title: 'Atenção!',
        message: result.error.message,
        type: 'error',
        duration: 10000,
      });
      return;
    }

    router.replace('/products');
  });

  const handleCancel = () => router.replace('/products');

  return (
    <FormTemplate
      title={title}
      onCancel={handleCancel}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      loading={loading}
    >
      <Input
        label="Nome (*)"
        autoFocus
        maxLength={255}
        {...register('name')}
        error={errors.name?.message}
      />
      <TextArea
        label="Descrição"
        maxLength={255}
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
