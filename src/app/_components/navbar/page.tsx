"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/context/cartContext'



export default function Navbar() {
  const { data: session } = useSession()
  const cartContext = useContext(CartContext)

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }
  return <>

    <nav className="bg-red-300 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 py-4 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-x-10">
          <Link href="/" className="font-extrabold text-2xl flex items-center gap-2">
            <i className="fa-solid fa-cart-arrow-down text-red-600 text-3xl"></i>
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-tight">FreshCart</span>
          </Link>

          <ul className="hidden lg:flex gap-x-8 items-center font-semibold text-gray-600">
            <li>
              <Link href="/" className="hover:text-red-600 transition-all">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-red-600 transition-all">Products</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-red-600 transition-all">Categories</Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-red-600 transition-all">Brands</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-x-6">
          {session ? (
            <>

              <div className="hidden md:flex gap-x-6 items-center text-gray-700 font-medium">
                <Link href="/allorders" className="hover:text-red-600 transition-colors">Orders</Link>
                <Link href="/address" className="hover:text-red-600 transition-colors">Addresses</Link>
              </div>


              <div className="flex items-center gap-x-5 pl-6 border-l border-gray-100">
                <Link href="/wishlist" title="Wishlist" className="relative text-gray-700 hover:text-red-600 transition-all">
                  <i className="fa-regular fa-heart text-2xl"></i>
                </Link>

                <Link href="/carts" title="Cart" className="relative text-gray-700 hover:text-red-600 transition-all">
                  <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  {cartContext && cartContext.number > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {cartContext.number}
                    </span>
                  )}
                </Link>

                <button
                  onClick={logOut}
                  className="ml-2 flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-x-4 items-center pl-4">
              <li><Link href="/register" className="text-gray-600 hover:text-red-600 font-bold transition-colors">Register</Link></li>
              <li>
                <Link href="/login" className="bg-red-600 text-white px-6 py-2.5 rounded-xl hover:bg-red-700 font-bold transition-all shadow-lg shadow-red-100 active:scale-95">
                  Login
                </Link>
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>

  </>

}
