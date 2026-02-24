import { allProducts } from '@/api/allProduct.api'
import React from 'react'
import SingelProduct from '../SingelProduct/SingelProduct'
import { product } from './../../../type/product.type';

export default async function AllProduct() {
  const data = await allProducts()
 
  return <>
 <div className=" w-[90%] mx-auto mt-5 container">
  <div className='flex flex-wrap'>
 {data.map((prod : product)=>{
    return <SingelProduct product={prod} key={prod.id}/>
  })}
  </div>
 </div>
  </>
}
