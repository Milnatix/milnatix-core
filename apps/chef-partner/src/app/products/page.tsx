'use client';

import { deleteProduct, list } from '@/application/products/facades/product.facade';
import ListItem from '@/components/molecule/ListItem';
import List from '@/components/organism/List';
import MainNavigationTemplate from '@/components/template/MainNavigationTemplate';
import { useAlertStore } from '@/shared/stores/alert.store';
import { useConfirmModalStore } from '@/shared/stores/confirm-modal.store';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function ProductPage() {
  const router = useRouter();
  const { showConfirmModal } = useConfirmModalStore();
  const { showAlert } = useAlertStore();

  const [productList, setProductList] = useState<ListProductResponseDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Busca produtos
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await list();
      if (result.success) {
        setProductList(result.value);
      } else {
        setError(result.error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    const result = await deleteProduct(productId);
    if (!result.success) {
      showAlert({
        title: 'Erro ao excluir produto',
        message: result.error.message,
        type: 'error',
      });
      return;
    }

    setProductList((prev) => prev?.filter((p) => p.id !== productId) || null);

    showAlert({
      title: 'Produto excluído com sucesso',
      message: 'O produto foi excluído com sucesso',
      type: 'success',
    });
  };

  const handleEditProduct = useCallback((product: ListProductResponseDTO) => {
    router.push(`/products/${product.id}/edit`);
  }, []);

  const handleAddProduct = () => {
    router.push('/products/new');
  };

  const handleConfirmDeleteProduct = useCallback(
    (product: ListProductResponseDTO) => {
      showConfirmModal({
        title: 'Excluir produto',
        message: `Tem certeza que deseja excluir o produto "${product.name}"?`,
        onConfirm: async () => await handleDeleteProduct(product.id),
        cancelText: 'Cancelar',
        confirmText: 'Excluir',
        confirmButtonVariant: 'danger',
      });
    },
    [],
  );

  if (error) {
    return (
      <MainNavigationTemplate title="Produtos">
        <div className="h-screen w-screen flex items-center justify-center">
          <p>{error}</p>
        </div>
      </MainNavigationTemplate>
    );
  }

  if (!productList) {
    return (
      <MainNavigationTemplate title="Produtos">
        <div className="h-screen w-screen flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      </MainNavigationTemplate>
    );
  }

  return (
    <MainNavigationTemplate title="Produtos" onFabClick={handleAddProduct}>
      <div className="flex-1 overflow-y-auto px-2 pt-2">
        <List
          items={productList}
          renderItem={(product) => (
            <ListItem
              title={product.name}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleConfirmDeleteProduct(product)}
            />
          )}
        />
      </div>
    </MainNavigationTemplate>
  );
}
