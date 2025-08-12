'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
import Button from '../Button';

interface HeaderProps {
  title: string;
  disableBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, disableBack }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  return (
    <header className="flex items-center w-full bg-white border-b-1 border-redappetite">
      <div className='flex-1'>
        <Button
          aria-label="Voltar"
          className="p-2 rounded hover:bg-gray-200 transition bg-white"
          onClick={goBack}
          disabled={disableBack}
        >
          <FaAngleLeft size={30} className='text-redappetite' />
        </Button>
      </div>
      <div className='flex-6 justify-center flex h-full items-center'>
        <h1 className="text-xl font-semibold text-redappetite">{title}</h1>
      </div>
      <div className='flex-1' />
    </header>
  );
};

export default Header;
