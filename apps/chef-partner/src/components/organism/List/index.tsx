import React from "react";

interface ListProps<T extends { id: string }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

const List = <T extends { id: string }>({ items, renderItem, className = "" }: ListProps<T>) => {
  if (!items.length) {
    return <p className="text-gray-500 text-center p-4">Nenhum item encontrado.</p>;
  }

  return (
    <div className={`flex-1 flex flex-col overflow-y-auto ${className} h-[100%]`}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default List;
