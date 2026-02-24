"use client"
import React, { useState, useEffect } from 'react'
import { addToWishlist, removeFromWishlist, getUserWishlist } from '@/wishlistActions/wishlist.actions'
import { toast } from 'sonner'
import { product } from '@/type/product.type'

export default function WishlistBtn({ productId }: { productId: string }) {
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function checkWishlist() {
            try {
                const res = await getUserWishlist()
                if (res.status === "success") {
                    const found = res.data.some((item: product) => item.id === productId || item._id === productId)
                    setIsInWishlist(found)
                }
            } catch (error) {
                console.error(error)
            }
        }
        checkWishlist()
    }, [productId])

    async function toggleWishlist() {

        const previousState = isInWishlist;
        setIsInWishlist(!previousState);
        setIsLoading(true)

        try {
            if (previousState) {
                const res = await removeFromWishlist(productId)
                if (res.status === "success") {
                    toast.success("Removed from wishlist")
                } else {
                    setIsInWishlist(previousState)
                    toast.error(res.message || "Failed to remove")
                }
            } else {
                const res = await addToWishlist(productId)
                if (res.status === "success") {
                    toast.success("Added to wishlist ❤️")
                } else {
                    setIsInWishlist(previousState)
                    toast.error(res.message || "Failed to add")
                }
            }
        } catch (error) {
            console.error(error)
            setIsInWishlist(previousState)
            toast.error("Process failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            disabled={isLoading}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist();
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all active:scale-90 z-10"
        >
            <i className={`fa-solid fa-heart text-xl transition-all duration-300 ${isInWishlist ? 'text-red-600 scale-110' : 'text-gray-300'}`}></i>
        </button>
    )
}

