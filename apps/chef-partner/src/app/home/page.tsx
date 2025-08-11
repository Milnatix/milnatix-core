import React from 'react'
import Link from 'next/link';

export const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      Hello from home
      <Link href="/products">Produtos</Link>
    </div>
  )
}

export default HomePage