'use client';

import MainList from '@/components/organism/MainList';
import MainNavigationTemplate from '@/components/template/MainNavigationTemplate';
import { ProductService } from '@/services/product.service';
import { useAlertStore } from '@/shared/stores/alert.store';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const productService = new ProductService();

export default function ProductPage() {
  const router = useRouter();
  const { showAlert } = useAlertStore();

  const [productList, setProductList] = useState<
    ListProductResponseDTO[] | null
  >(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await productService.list();
      if (result.success) {
        setProductList(result.value);
      } else {
        showAlert({
          title: 'Erro ao listar produtos',
          message: result.error.message,
          type: 'error',
        });
        setProductList([]);
      }
    };

    void fetchProducts();
  }, []);

  const handleDeleteProduct = async (product: ListProductResponseDTO) => {
    const result = await productService.delete(product.id);
    if (!result.success) {
      showAlert({
        title: 'Erro ao excluir produto',
        message: result.error.message,
        type: 'error',
      });
      return;
    }

    setProductList((prev) => prev?.filter((p) => p.id !== product.id) || null);

    showAlert({
      title: 'Produto excluído com sucesso',
      message: 'O produto foi excluído com sucesso',
      type: 'success',
    });
  };

  const handleEditProduct = (product: ListProductResponseDTO) => {
    router.push(`/products/${product.id}/edit`);
  };

  const handleAddProduct = () => {
    router.push('/products/new');
  };

  return (
    <MainNavigationTemplate title="Produtos" onFabClick={handleAddProduct}>
      <MainList
        items={productList}
        getItemTitle={(product) => product.name}
        onEditItem={handleEditProduct}
        onDeleteItem={handleDeleteProduct}
      />
    </MainNavigationTemplate>
  );
}
