'use client';

import React from 'react';
import MainNavigationTemplate from '@/components/template/MainNavigationTemplate';

const HomePage: React.FC = () => {
  return (
    <MainNavigationTemplate title="Início">
      <div>Hello World!</div>
    </MainNavigationTemplate>
  );
};

export default HomePage;
