import React from 'react'
import { allProducts } from '@/api/allProduct.api'
import SingelProduct from '../_components/SingelProduct/SingelProduct'
import { product } from '@/type/product.type'

export default async function Products() {
  const data = await allProducts()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container w-[90%] mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our All Products</h1>
          <p className="text-gray-500">Find everything you need with best prices.</p>
        </div>

        <div className="flex flex-wrap -mx-2">
          {data.map((prod: product) => (
            <SingelProduct key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  )
}
