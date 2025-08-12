'use client'


import FloatingMenu from '@/components/molecule/FloatingMenu';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className='bg-gradient-app h-screen w-screen overflow-hidden'>
      <FloatingMenu items={[{ label: 'Produtos', path: '/products' }]} />
    </div>
  );
};

export default HomePage;
