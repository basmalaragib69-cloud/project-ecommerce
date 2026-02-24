"use client"
import React, { useContext, useEffect, useState } from 'react'
import { getUserCart } from '@/cartActions/getUserCart.action';
import { removeItemCart } from '@/cartActions/removeItemCart.action';
import { toast } from 'sonner';
import { updateCart } from '@/cartActions/updateCart.action';
import { Button } from '@/components/ui/button';
import { removeCartClear } from '@/cartActions/removeCart.action';
import { CartContext } from '@/context/cartContext';
import { CartItem, CartResponse } from '@/type/cart.types';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [currentUpdatingId, setCurrentUpdatingId] = useState<string>('');
  const { number, setnumber } = useContext(CartContext)!;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartId, setCartId] = useState<string>('');

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const res = await getUserCart() as CartResponse;
        if (res.status === "success" && res.data) {
          setCartId(res.data._id);
          setProducts(res.data.products);
          setTotalPrice(res.data.totalCartPrice);


          setnumber(res.numOfCartItems);
        }
      } catch (error) {
        console.error("error fetching cart:", error);
        toast.error("Couldn't load your cart.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartProducts();
  }, [setnumber]);

  async function handleRemoveItem(id: string) {
    setIsUpdatingCart(true);
    setCurrentUpdatingId(id);

    try {
      const res = await removeItemCart(id) as CartResponse;
      if (res.status === "success" && res.data) {
        toast.success("Item removed");
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        setnumber(res.numOfCartItems);
      }
    } catch (error) {
      console.error(error)
      toast.error("Error happened!");
    } finally {
      setIsUpdatingCart(false);
      setCurrentUpdatingId('');
    }
  }

  async function handleUpdateQuantity(id: string, count: number) {
    if (count <= 0) return;

    setIsUpdatingCart(true);
    setCurrentUpdatingId(id);

    try {
      const res = await updateCart(id, count.toString()) as CartResponse;
      if (res.status === "success" && res.data) {
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        setnumber(res.numOfCartItems);
      }
    } catch (error) {
      console.error(error)
      toast.error("Error updating count");
    } finally {
      setIsUpdatingCart(false);
      setCurrentUpdatingId('');
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <i className="fas fa-spinner fa-spin text-3xl text-red-600"></i>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto bg-[#f8f9fa] p-8 md:px-16 rounded">

        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-800 mb-1">Shop Cart :</h1>
          <h2 className="text-xl font-medium text-red-500">
            Total Cart Price : {totalPrice} EGP
          </h2>
        </div>

        {products && products.length > 0 ? (
          <>
            <div className="space-y-0">
              {products.map((prod) => (
                <div
                  key={prod.product._id || prod.product.id}
                  className="flex items-center gap-6 py-8 border-b border-gray-200 last:border-b-0"
                >

                  <div className="w-24 h-24 sm:w-40 sm:h-40 flex-shrink-0 bg-white p-2 flex items-center justify-center">
                    <Image
                      src={prod.product.imageCover}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                      alt={prod.product.title}
                    />
                  </div>


                  <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {prod.product.title}
                      </h3>
                      <p className="text-red-600 font-medium">
                        price : {prod.price}
                      </p>

                      <button
                        onClick={() => handleRemoveItem(prod.product._id || prod.product.id)}
                        className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2 text-sm"
                      >
                        <i className="fa-solid fa-trash-can text-red-800"></i> Remove
                      </button>
                    </div>


                    <div className="flex items-center gap-4">
                      <button
                        disabled={isUpdatingCart && currentUpdatingId === (prod.product._id || prod.product.id)}
                        onClick={() => handleUpdateQuantity(prod.product._id || prod.product.id, prod.count + 1)}
                        className="w-9 h-9 border border-red-400 text-red-500 rounded-md flex items-center justify-center hover:bg-green-50 disabled:opacity-50 text-xl font-light"
                      >
                        +
                      </button>

                      <div className="w-6 text-center text-lg font-medium text-gray-800">
                        {isUpdatingCart && currentUpdatingId === (prod.product._id || prod.product.id) ? (
                          <i className="fas fa-spinner fa-spin text-sm text-red-600"></i>
                        ) : (
                          prod.count
                        )}
                      </div>

                      <button
                        disabled={prod.count <= 1 || (isUpdatingCart && currentUpdatingId === (prod.product._id || prod.product.id))}
                        onClick={() => handleUpdateQuantity(prod.product._id || prod.product.id, prod.count - 1)}
                        className="w-9 h-9 border border-red-200 text-red-700 rounded-md flex items-center justify-center hover:bg-green-50 disabled:opacity-50 text-xl font-light"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-sm">Total items: {number}</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalPrice} EGP</h3>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <Button
                  onClick={() => removeCartClear()}
                  variant="outline"
                  className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
                <Link
                  href={`/checkout/${cartId}`}
                  className="flex-1 sm:flex-none bg-red-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-red-700 transition-all text-center shadow-lg shadow-red-100"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mb-4">
              <i className="fa-solid fa-bag-shopping text-6xl text-gray-200"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty!</h1>
            <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/products" className="bg-red-400 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-all">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
