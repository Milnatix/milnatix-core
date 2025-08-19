'use client';

import Header from '@/components/atom/Header';
import BottomNavigation, {
  NavItem,
} from '@/components/molecule/BottomNavigation';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';

interface MainNavigationTemplateProps {
  title: string;
  children: React.ReactNode;
  onFabClick?: () => void;
}

const items: NavItem[] = [
  {
    label: 'Início',
    path: '/home',
    icon: <FaHome />,
  },
  {
    label: 'Produtos',
    path: '/products',
    icon: <FiShoppingBag />,
  },
];

const MainNavigationTemplate: React.FC<MainNavigationTemplateProps> = ({
  title,
  children,
  onFabClick,
}) => (
  <div className="bg-gradient-app h-screen w-screen overflow-hidden">
    <Header title={title} />
    <div className="flex-1">{children}</div>
    <BottomNavigation items={items} onFabClick={onFabClick} />
  </div>
);

export default MainNavigationTemplate;
