import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
            <div className="relative">
                
                <div className="w-20 h-20 border-4 border-red-100 rounded-full animate-pulse"></div>
               
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-cart-shopping text-red-600 text-2xl animate-bounce"></i>
                </div>
            </div>
            <p className="mt-4 text-gray-900 font-bold tracking-widest uppercase text-xs animate-pulse">
                FreshCart is loading...
            </p>
        </div>
    )
}
