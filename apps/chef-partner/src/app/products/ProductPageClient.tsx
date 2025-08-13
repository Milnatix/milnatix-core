'use client';

import Button from '@/components/atom/Button';
import Header from '@/components/atom/Header';
import ListItem from '@/components/molecule/ListItem';
import List from '@/components/organism/List';
import { useConfirmModalStore } from '@/shared/stores/confirm-modal.store';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

export default function ProductPageClient({ products }: { products: ListProductResponseDTO[] }) {
  const router = useRouter();
  const { show } = useConfirmModalStore();


  const editProductHandler = (product: ListProductResponseDTO) => {
    console.log('edit', product);
  }

  const deleteProductHandler = (product: ListProductResponseDTO) => {
    show({
      title: 'Excluir produto',
      message: 'Tem certeza que deseja excluir esse produto?',
      onConfirm: () => console.log('confirmado'),
      cancelText: 'Cancelar',
      confirmText: 'Excluir',
    })
  }

  return (
    <div className='bg-gradient-app h-screen w-screen flex flex-col'>
      <Header 
        title='Produtos'
        onGoBack={() => router.replace('/home')}
      />
       <div className="flex-1 overflow-y-auto px-2 pt-2">
        <List items={products} 
          renderItem={(product) => (
            <ListItem title={product.name} 
              onEdit={() => editProductHandler(product)}
              onDelete={() => deleteProductHandler(product)} />
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
