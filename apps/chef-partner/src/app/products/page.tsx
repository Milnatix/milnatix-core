import { list } from '@/application/facades/product.facade'
import Button from '@/components/atom/Button'
import Link from 'next/link';
import React from 'react'
import { FaPlus } from "react-icons/fa";


export const ProductPage: React.FC = async () => {
  // TODO: Listar produtos
  // const products = await list();

  return (
    <div className='bg-gradient-app h-screen w-screen'>
      <Link href='/products/form'>
        <Button className='absolute bottom-4 right-4 w-12 h-12 p-0 rounded-full'
          variant='primary'>
          <FaPlus />
        </Button>
      </Link>
    </div>
  )
}

export default ProductPage