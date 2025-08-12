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


const ProductFormPage: React.FC = () => {
  const router = useRouter();

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
  });

  const onCancel = () => {
    router.back();
  };

  return (
    <FormTemplate title="Novo produto" onCancel={onCancel} onSubmit={onSubmit} isSubmitting={isSubmitting}>
      <Input label="Nome (*)" autoFocus maxLength={255} {...register('name')} error={errors.name?.message} />
      <TextArea label="Descrição" maxLength={255} {...register('description')} error={errors.description?.message} />
      <Input type='number' label="Preço (*)" {...register('salePrice', { valueAsNumber: true })} error={errors.salePrice?.message} />
      <Input type='number' label="Preço de custo" {...register('costPrice', { valueAsNumber: true })} error={errors.costPrice?.message} />
    </FormTemplate>
  );
};

export default ProductFormPage;
