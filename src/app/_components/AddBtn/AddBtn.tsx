"use client"
import { addToCart } from '@/cartActions/addToCart.action'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import React, { useContext, useState } from 'react'
import { CartContext } from '@/context/cartContext'
import { CartResponse } from '@/type/cart.types'

export default function AddBtn({ id }: { id: string }) {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart(productId: string) {
    if (!cartContext) return;


    const previousNumber = cartContext.number;
    cartContext.setnumber(previousNumber + 1);
    setIsLoading(true);

    try {
      const res = await addToCart(productId) as CartResponse;

      if (res.status === 'success') {
        toast.success("Done! Item added to cart 🛒");

        cartContext.setnumber(res.numOfCartItems);
      } else {

        cartContext.setnumber(previousNumber);
        toast.error(res.message || "Process failed, try again");
      }
    } catch (err) {
      console.error(err);
      cartContext.setnumber(previousNumber);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={() => handleAddToCart(id)}
      className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 transform flex items-center justify-center gap-2 shadow-sm ${isLoading ? 'scale-[0.98]' : 'hover:scale-[1.02] active:scale-95'}`}
    >
      {isLoading ? (
        <>
          <i className="fas fa-spinner fa-spin"></i> Adding...
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus"></i> Add To Cart
        </>
      )}
    </Button>
  );
}

