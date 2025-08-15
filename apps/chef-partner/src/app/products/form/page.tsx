'use client'

import { create } from '@/application/facades/product.facade';
import { prodructFormSchema, ProductFormData } from '@/application/schemas/product/form.schema';
import Input from '@/components/atom/Input';
import FormTemplate from '@/components/template/FormTemplate';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextArea from '@/components/atom/TextArea';
import { useAlertStore } from '@/shared/stores/alert.store';


const ProductFormPage: React.FC = () => {
  const router = useRouter();
  const { showAlert: show } = useAlertStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(prodructFormSchema),
    mode: "onSubmit",
    defaultValues: {
      salePrice: 0,
      costPrice: null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await create(data);
    console.log("create result:", result);

    if (!result.success) {
      show({
        title: 'Atenção!',
        message: result.error.message,
        type: "error",
        duration: 10000,
      })
      return;
    }

    router.replace('/products');
  });

  const onCancel = () => router.replace('/products');;

  return (
    <FormTemplate title="Novo produto" onCancel={onCancel} onSubmit={onSubmit} isSubmitting={isSubmitting}>
      <Input label="Nome (*)"
        autoFocus
        maxLength={255}
        {...register('name')}
        error={errors.name?.message} />
      <TextArea label="Descrição"
        maxLength={255}
        {...register('description')}
        error={errors.description?.message} />
      <Input label="Preço (*)"
        type='number'
        {...register('salePrice', { valueAsNumber: true })}
        error={errors.salePrice?.message}
        step="0.01" />
      <Input label="Preço de custo"
        type='number'
        {...register('costPrice', { valueAsNumber: true })}
        error={errors.costPrice?.message}
        step="0.01" />
    </FormTemplate>
  );
};

export default ProductFormPage;
