'use client';

import Button from '@/components/atom/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  items: NavItem[];
  onFabClick?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  onFabClick,
}) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-white border-t shadow-md z-10">
        <ul className="flex justify-around">
          {items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="flex flex-col items-center py-2">
                <Link
                  href={item.path}
                  className={`flex flex-col items-center ${isActive ? 'text-redappetite' : 'text-gray-500'}`}
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {onFabClick && (
        <Button
          onClick={onFabClick}
          className="fixed bottom-16 right-4 h-12 p-0 rounded-full"
          aria-label="Nova ação"
          variant="primary"
        >
          <FaPlus />
        </Button>
      )}
    </>
  );
};

export default BottomNavigation;
