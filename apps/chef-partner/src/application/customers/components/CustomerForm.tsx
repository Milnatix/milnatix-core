'use client';

import {
  CreateCustomerFormData,
  createCustomerSchema,
} from '@/application/customers/schemas/create.schema';
import Input from '@/components/atom/Input';
import MaskedInput from '@/components/atom/MaskedInput';
import TextArea from '@/components/atom/TextArea';
import ListItem from '@/components/molecule/ListItem';
import List from '@/components/organism/List';
import FormTemplate from '@/components/template/FormTemplate';
import { useAlertStore } from '@/shared/stores/alert.store';
import { Result } from '@/shared/types/Result.type';
import { getDynamicFederalDocumentMask } from '@/shared/utils/mask.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CustomerDetailResponseDTO,
  CustomerSummaryDTO,
  SummaryCustomerAddressDTO,
} from '@milnatix-core/dtos';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface CustomerFormProps {
  title: string;
  customerInitialData?: CustomerDetailResponseDTO | null;
  loading?: boolean;
  onSubmit: (
    product: CreateCustomerFormData,
  ) => Promise<
    Result<CustomerSummaryDTO, { message: string; status?: number }>
  >;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  title,
  customerInitialData,
  onSubmit,
  loading,
}) => {
  const router = useRouter();
  const { showAlert } = useAlertStore();
  const [addresses, setAddresses] = useState<SummaryCustomerAddressDTO[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
    mode: 'onSubmit',
    defaultValues: customerInitialData || undefined,
  });

  useEffect(() => {
    if (customerInitialData) {
      reset(customerInitialData);
      setAddresses(customerInitialData.addresses);
    }
  }, [customerInitialData, reset]);

  const goToCustomersList = () => router.replace('/customers');

  const handleFormSubmit = handleSubmit(async (data) => {
    const result = await onSubmit(data);
    console.log(result);

    if (!result.success) {
      console.log('aqui');
      showAlert({
        title: 'Atenção!',
        message: result.error.message,
        type: 'error',
        duration: 10000,
      });
      return;
    }

    goToCustomersList();
  });

  return (
    <FormTemplate
      title={title}
      onCancel={goToCustomersList}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      loading={loading}
    >
      <Input
        label="Nome completo (*)"
        autoFocus
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      <Input
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        type="email"
      />
      <Input
        label="Telefone"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Controller
        name="federalDocument"
        control={control}
        render={({ field }) => (
          <MaskedInput
            maskPattern={getDynamicFederalDocumentMask(
              watch('federalDocument'),
            )}
            value={field.value || undefined}
            onValueChange={(unmasked) => field.onChange(unmasked)}
            label="CPF/CNPJ"
            error={errors.federalDocument?.message}
          />
        )}
      />
      <TextArea
        label="Anotações"
        {...register('note')}
        error={errors.note?.message}
      />

      <List
        items={addresses}
        renderItem={(address) => (
          <ListItem title={`${address.street}, ${address.number}`} />
        )}
      />
    </FormTemplate>
  );
};

export default CustomerForm;
