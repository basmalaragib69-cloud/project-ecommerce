"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getUserWishlist, removeFromWishlist } from '@/wishlistActions/wishlist.actions'
import { product } from '@/type/product.type'
import { toast } from 'sonner'
import { addToCart } from '@/cartActions/addToCart.action'
import { useContext } from 'react'
import { CartContext } from '@/context/cartContext'

export default function Wishlist() {
    const [wishlist, setWishlist] = useState<product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const cartContext = useContext(CartContext)

    async function fetchWishlist() {
        setIsLoading(true)
        try {
            const res = await getUserWishlist()
            if (res.status === "success") {
                setWishlist(res.data)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to load wishlist")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    async function handleRemove(id: string) {
        try {
            const res = await removeFromWishlist(id)
            if (res.status === "success") {
                toast.success("Removed from wishlist")

                setWishlist(wishlist.filter(item => item.id !== id && item._id !== id))
            }
        } catch (error) {
            console.error(error)
            toast.error("Error removing item")
        }
    }

    async function handleAddToCart(id: string) {
        try {
            const res = await addToCart(id)
            if (res.status === "success") {
                toast.success("Added to cart! 🛒")
                if (cartContext) cartContext.setnumber(res.numOfCartItems)
            }
        } catch (error) {
            console.error(error)
            toast.error("Could not add to cart")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <i className="fas fa-spinner fa-spin text-3xl text-[#4fa74f]"></i>
            </div>
        )
    }

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto bg-gray-50 p-8 md:px-16 rounded shadow-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My wish List</h1>
                </div>

                {wishlist.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {wishlist.map((item) => (
                            <div key={item._id || item.id} className="flex flex-col md:flex-row items-center gap-6 py-8">

                                <div className="w-40 h-40 flex-shrink-0 bg-white p-2 rounded flex items-center justify-center">
                                    <Image src={item.imageCover} alt={item.title} width={160} height={160} className="max-w-full max-h-full object-contain" />
                                </div>


                                <div className="flex-1 flex flex-col md:flex-row justify-between items-center w-full gap-4">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                                        <p className="text-[#4fa74f] font-bold text-lg">{item.price} EGP</p>
                                        <button
                                            onClick={() => handleRemove(item._id || item.id)}
                                            className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 mt-2 mx-auto md:mx-0"
                                        >
                                            <i className="fa-solid fa-trash-can"></i> remove
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => handleAddToCart(item._id || item.id)}
                                            className="border border-[#4fa74f] text-gray-800 px-6 py-2 rounded-lg hover:bg-[#4fa74f] hover:text-white transition-all text-lg font-medium"
                                        >
                                            add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-400">Your wishlist is empty</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
