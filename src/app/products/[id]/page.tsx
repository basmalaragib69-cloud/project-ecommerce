import Image from 'next/image'
import { getProductDetails } from '@/api/productDetails.api'
import React from 'react'
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import { getRelatedProducts } from '@/api/relatedproducts.api';
import SingelProduct from '@/app/_components/SingelProduct/SingelProduct';
import { product as ProductType } from '@/type/product.type';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> | { id: string } }) {

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const data = await getProductDetails(id)

  if (!data) return <div className="text-center py-20 text-red-500 font-bold">Loading...</div>;

  const res = await getRelatedProducts(data.category._id);
  const relatedProducts = res.data.filter((p: ProductType) => p.id !== (data.id || data._id));

  return (
    <div className='mt-10 mb-20'>
      <div className="container w-[90%] md:w-[80%] mx-auto">
        <div className='flex flex-wrap items-center bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='w-full md:w-1/3 p-8 bg-gray-50/50 flex justify-center'>
            <Image
              src={data.imageCover}
              className="w-full max-w-[300px] object-contain hover:scale-105 transition-transform duration-500"
              alt={data.title}
              width={500}
              height={500}
            />
          </div>

          <div className='w-full md:w-2/3 p-10 space-y-6'>
            <div>
              <h5 className='text-red-600 font-bold uppercase tracking-wider text-sm mb-2'>
                {data.brand?.name || data.category.name}
              </h5>
              <h1 className='text-3xl font-extrabold text-gray-900 leading-tight'>{data.title}</h1>
            </div>

            <p className='text-gray-600 leading-relaxed text-lg'>{data.description}</p>

            <div className='flex items-center gap-4'>
              <span className='px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold border border-red-100'>
                {data.category.name}
              </span>
            </div>

            <div className='pt-6 border-t border-gray-100'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className="text-3xl font-black text-gray-900">{data.price} EGP</h3>
                <div className='flex items-center bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100'>
                  <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                  <span className='font-bold text-yellow-900'>{data.ratingsAverage}</span>
                </div>
              </div>
              <AddBtn id={data.id || data._id} />
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="container w-[90%] md:w-[80%] mx-auto mt-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-2 bg-red-600 rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900">Related Products</h2>
          </div>

          <div className="flex flex-wrap -m-3">
            {relatedProducts.map((product: ProductType) => (
              <SingelProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
