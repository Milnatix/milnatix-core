'use client';

import { deleteProduct } from '@/application/facades/product.facade';
import Button from '@/components/atom/Button';
import Header from '@/components/atom/Header';
import ListItem from '@/components/molecule/ListItem';
import List from '@/components/organism/List';
import { useAlertStore } from '@/shared/stores/alert.store';
import { useConfirmModalStore } from '@/shared/stores/confirm-modal.store';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface ProductPageClientProps {
  products: ListProductResponseDTO[]
}

export default function ProductPageClient({ products }: ProductPageClientProps) {
  const router = useRouter();
  const { showConfirmModal } = useConfirmModalStore();
  const { showAlert } = useAlertStore();

  const [productList, setProductList] = useState(products)

  const handleDeleteProduct = async (productId: string) => {

    const result = await deleteProduct(productId);
    if (!result.success) {
      showAlert({
        title: 'Erro ao excluir produto',
        message: result.error.message,
        type: 'error'
      });
      return;
    }

    setProductList(prev => prev.filter(p => p.id !== productId));

    showAlert({
      title: 'Produto excluído com sucesso',
      message: 'O produto foi excluído com sucesso',
      type: 'success'
    });
  }

  const handleEditProduct = useCallback((product: ListProductResponseDTO) => {
    console.log('edit', product);
  }, []);
  
  const handleConfirmDeleteProduct = useCallback((product: ListProductResponseDTO) => {
    showConfirmModal({
      title: 'Excluir produto',
      message: `Tem certeza que deseja excluir o produto "${product.name}"?`,
      onConfirm: async () => await handleDeleteProduct(product.id),
      cancelText: 'Cancelar',
      confirmText: 'Excluir',
      confirmButtonVariant: 'danger'
    })
  }, [])

  return (
    <div className='bg-gradient-app h-screen w-screen flex flex-col'>
      <Header 
        title='Produtos'
        onGoBack={() => router.replace('/home')}
      />
       <div className="flex-1 overflow-y-auto px-2 pt-2">
        <List items={productList} 
          renderItem={(product) => (
            <ListItem title={product.name} 
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleConfirmDeleteProduct(product)} />
          )} />
      </div>

      <Link href='/products/form'>
        <Button
          className='absolute bottom-4 right-4 w-12 h-12 p-0 rounded-full'
          variant='primary'
        >
          <FaPlus />
        </Button>
      </Link>
    </div>
  );
}
