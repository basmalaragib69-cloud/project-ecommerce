import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { product } from './../../../type/product.type';
import AddBtn from '../AddBtn/AddBtn'
import WishlistBtn from '../WishlistBtn/WishlistBtn'


export default function SingelProduct({ product }: { product: product }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3">
      <div className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <Link href={`/products/${product.id}`} className="block overflow-hidden relative">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
            Sale
          </div>
          <WishlistBtn productId={product.id} />
        </Link>

        <div className="p-4 flex flex-col flex-1">
          <Link href={`/products/${product.id}`}>
            <span className="text-[#4fa74f] text-xs font-bold uppercase tracking-wider">{product.category.name}</span>
            <h3 className="text-gray-800 font-bold mt-1 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-900 font-bold">{product.price} EGP</span>
              <span className="flex items-center gap-1 text-xs">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="text-gray-500 font-medium">{product.ratingsAverage}</span>
              </span>
            </div>

            <AddBtn id={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
