'use client';

import CustomerForm from '@/application/customers/components/CustomerForm';
import { CreateCustomerFormData } from '@/application/customers/schemas/create.schema';
import { CustomerService } from '@/services/customer.service';
import { CustomerDetailResponseDTO } from '@milnatix-core/dtos';
import { use, useEffect, useState } from 'react';

interface EditCustomerPageProps {
  params: Promise<{ id: string }>;
}

const customerService = new CustomerService();

const EditCustomerPage: React.FC<EditCustomerPageProps> = ({ params }) => {
  const { id } = use(params);
  const [customer, setCustomer] = useState<CustomerDetailResponseDTO | null>(
    null,
  );

  useEffect(() => {
    const getCustomerDetails = async () => {
      const result = await customerService.getDetails(id);
      if (result.success) {
        setCustomer(result.value);
      }
    };

    void getCustomerDetails();
  }, [id]);

  const handleSubmit = async (customer: CreateCustomerFormData) => {
    return await customerService.update(id, customer);
  };

  return (
    <CustomerForm
      title="Editar cliente"
      customerInitialData={customer}
      onSubmit={handleSubmit}
      loading={!customer}
    />
  );
};

export default EditCustomerPage;
