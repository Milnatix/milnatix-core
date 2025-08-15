'use client';

import Button from '@/components/atom/Button';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoMenu } from 'react-icons/io5';

interface MenuItem {
  label: string;
  path: string;
}

interface FloatingMenuProps {
  items: MenuItem[];
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="absolute bottom-4 right-4 flex flex-col items-end"
      ref={ref}
    >
      <div
        className={
          'flex flex-col mb-2 space-y-2 transition-all duration-200 ' +
          (isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none')
        }
      >
        {items.map((item, index) => (
          <Link key={index} href={item.path}>
            <Button type="button">{item.label}</Button>
          </Link>
        ))}
      </div>
      <Button
        type="button"
        variant="primary"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="w-12 h-12 p-0 rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoMenu />
      </Button>
    </div>
  );
};

export default FloatingMenu;
