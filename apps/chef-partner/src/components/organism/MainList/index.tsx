import ListItem from '@/components/molecule/ListItem';
import List from '@/components/organism/List';
import { useConfirmModalStore } from '@/shared/stores/confirm-modal.store';
import { useCallback } from 'react';

interface MainListPageTemplateProps<ItemType extends { id: string }> {
  items: ItemType[] | null;
  getItemTitle: (item: ItemType) => string;
  onEditItem?: (item: ItemType) => void;
  onDeleteItem?: (item: ItemType) => Promise<void>;
}

export default function MainList<ItemType extends { id: string }>({
  items,
  getItemTitle,
  onEditItem,
  onDeleteItem,
}: MainListPageTemplateProps<ItemType>) {
  const { showConfirmModal } = useConfirmModalStore();

  if (!items?.length) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  const handleConfirmDeleteItem = (item: ItemType) => {
    console.log('HERE');
    if (!onDeleteItem) {
      return;
    }

    showConfirmModal({
      title: 'Excluir produto',
      message: `Tem certeza que deseja excluir "${getItemTitle(item)}"?`,
      onConfirm: async () => await onDeleteItem(item),
      cancelText: 'Cancelar',
      confirmText: 'Excluir',
      confirmButtonVariant: 'danger',
    });
  };

  return (
    <main className="flex-1 overflow-y-auto px-2 pt-2">
      <List
        items={items}
        renderItem={(item) => (
          <ListItem
            title={getItemTitle(item)}
            onEdit={onEditItem ? () => onEditItem(item) : undefined}
            onDelete={
              onDeleteItem ? () => handleConfirmDeleteItem(item) : undefined
            }
          />
        )}
      />
    </main>
  );
}
