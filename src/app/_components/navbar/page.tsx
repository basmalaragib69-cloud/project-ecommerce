"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { CartContext } from '@/context/cartContext'
import { Menu, X, ShoppingBag, Heart, User, LogOut, Package, MapPin } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const cartContext = useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 py-3 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-x-8">
            <Link href="/" className="font-extrabold text-2xl flex items-center gap-2">
              <i className="fa-solid fa-cart-arrow-down text-red-600 text-2xl"></i>
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-tight">FreshCart</span>
            </Link>

            <ul className="hidden lg:flex gap-x-6 items-center font-semibold text-gray-600">
              <li><Link href="/" className="hover:text-red-600 transition-all">Home</Link></li>
              <li><Link href="/products" className="hover:text-red-600 transition-all">Products</Link></li>
              <li><Link href="/categories" className="hover:text-red-600 transition-all">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-red-600 transition-all">Brands</Link></li>
            </ul>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="hidden md:flex items-center gap-x-4 border-r border-gray-100 pr-4">
              <Link href="/wishlist" title="Wishlist" className="p-2 text-gray-700 hover:text-red-600 transition-all hover:bg-red-50 rounded-full">
                <Heart className="w-5 h-5" />
              </Link>

              <Link href="/carts" title="Cart" className="relative p-2 text-gray-700 hover:text-red-600 transition-all hover:bg-red-50 rounded-full">
                <ShoppingBag className="w-5 h-5" />
                {cartContext && cartContext.number > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                    {cartContext.number}
                  </span>
                )}
              </Link>
            </div>

            {session ? (
              <div className="flex items-center gap-x-2">
                <div className="hidden lg:flex items-center gap-x-4 text-sm font-bold text-gray-700 mr-2">
                  <Link href="/allorders" className="hover:text-red-600 transition-colors">My Orders</Link>
                  <Link href="/address" className="hover:text-red-600 transition-colors">Addresses</Link>
                </div>
                <button
                  onClick={logOut}
                  className="hidden sm:flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-x-3 items-center">
                <Link href="/register" className="text-gray-600 hover:text-red-600 font-bold px-4 py-2 transition-colors">Register</Link>
                <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 font-bold transition-all shadow-lg shadow-red-100 active:scale-95">
                  Login
                </Link>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-y-4">
              <Link onClick={toggleMenu} href="/" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                Home
              </Link>
              <Link onClick={toggleMenu} href="/products" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                Products
              </Link>
              <Link onClick={toggleMenu} href="/categories" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                Categories
              </Link>
              <Link onClick={toggleMenu} href="/brands" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                Brands
              </Link>

              <div className="h-[1px] bg-gray-100 my-2"></div>

              <Link onClick={toggleMenu} href="/wishlist" className="flex items-center justify-between p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </div>
              </Link>

              <Link onClick={toggleMenu} href="/carts" className="flex items-center justify-between p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  My Cart
                </div>
                {cartContext && cartContext.number > 0 && (
                  <span className="bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartContext.number}
                  </span>
                )}
              </Link>

              {session ? (
                <>
                  <Link onClick={toggleMenu} href="/allorders" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                    <Package className="w-5 h-5" />
                    My Orders
                  </Link>
                  <Link onClick={toggleMenu} href="/address" className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                    <MapPin className="w-5 h-5" />
                    My Addresses
                  </Link>
                  <button
                    onClick={() => { logOut(); toggleMenu(); }}
                    className="flex items-center gap-3 p-3 font-extrabold text-red-600 bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Link onClick={toggleMenu} href="/register" className="flex items-center justify-center p-4 font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    Register
                  </Link>
                  <Link onClick={toggleMenu} href="/login" className="flex items-center justify-center p-4 font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
