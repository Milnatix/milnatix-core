'use client';

import MainList from '@/components/organism/MainList';
import MainNavigationTemplate from '@/components/template/MainNavigationTemplate';
import { CustomerService } from '@/services/customer.service';
import { useAlertStore } from '@/shared/stores/alert.store';
import { CustomerSummaryDTO } from '@milnatix-core/dtos';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const customerService = new CustomerService();

export default function CustomersPage() {
  const router = useRouter();
  const { showAlert } = useAlertStore();

  const [customersList, setCustomersList] = useState<
    CustomerSummaryDTO[] | null
  >(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await customerService.list();
      if (result.success) {
        setCustomersList(result.value);
      } else {
        showAlert({
          title: 'Erro ao listar clientes',
          message: result.error.message,
          type: 'error',
        });
        setCustomersList([]);
      }
    };

    void fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    router.push('/customers/new');
  };

  const handleEditCustomer = (customer: CustomerSummaryDTO) => {
    router.push(`/customers/${customer.id}/edit`);
  };

  const handleDeleteCustomer = async (customer: CustomerSummaryDTO) => {
    const result = await customerService.delete(customer.id);
    if (!result.success) {
      showAlert({
        title: 'Erro ao excluir cliente',
        message: result.error.message,
        type: 'error',
      });
      return;
    }

    setCustomersList(
      (prev) => prev?.filter((c) => c.id !== customer.id) || null,
    );

    showAlert({
      title: 'Cliente excluído com sucesso',
      message: 'O cliente foi excluído com sucesso',
      type: 'success',
    });
  };
  return (
    <MainNavigationTemplate title="Clientes" onFabClick={handleAddCustomer}>
      <MainList
        items={customersList}
        getItemTitle={(customer) => customer.name}
        onEditItem={handleEditCustomer}
        onDeleteItem={handleDeleteCustomer}
      />
    </MainNavigationTemplate>
  );
}
