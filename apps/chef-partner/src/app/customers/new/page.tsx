'use client';

import CustomerForm from '@/application/customers/components/CustomerForm';
import { CreateCustomerFormData } from '@/application/customers/schemas/create.schema';
import { CustomerService } from '@/services/customer.service';

const customerService = new CustomerService();

const NewCustomerForm: React.FC = () => {
  const handleSubmit = async (customer: CreateCustomerFormData) => {
    return await customerService.create(customer);
  };

  return <CustomerForm title="Novo cliente" onSubmit={handleSubmit} />;
};

export default NewCustomerForm;
