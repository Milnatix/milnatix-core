import Button from "@/components/atom/Button";
import React from "react";

interface ListItemProps {
  title: string;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, description, onEdit, onDelete, className = "" }) => {
  return (
    <div
      className={`
        flex flex-col sm:flex-row
        justify-between items-start sm:items-center
        bg-white border border-gray-200 rounded-md
        p-4 mb-2
        shadow-sm
        transition
        ${className}
      `}
    >
      <div className="flex flex-col flex-1">
        <span className="text-gray-900 font-bold">{title}</span>
        {description && <span className="text-gray-500 text-sm mt-1">{description}</span>}
      </div>

      {(onEdit || onDelete) && (
        <div className="flex mt-2 sm:mt-0 sm:ml-4 space-x-2">
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="danger"
            >
              Excluir
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="secondary"
            >
              Editar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListItem;
