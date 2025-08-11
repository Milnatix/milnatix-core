import { list } from '@/application/facades/product.facade'
import React from 'react'

export const ProductPage: React.FC = async () => {
  const products = await list();

  return (
    <div>Hello from products</div>
  )
}

export default ProductPage