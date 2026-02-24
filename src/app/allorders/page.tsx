"use client"
import React, { useEffect, useState } from 'react'
import { getUserOrders } from '@/cartActions/orders.action'
import { toast } from 'sonner'
import { ShoppingBag, Package, Calendar, CreditCard, ChevronRight, Truck, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface OrderItem {
    id: string;
    _id: string;
    createdAt: string;
    totalOrderPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    paymentMethodType: string;
    shippingAddress: {
        city: string;
        details: string;
    };
    cartItems: Array<{
        _id: string;
        count: number;
        price: number;
        product: {
            title: string;
            imageCover: string;
        };
    }>;
}

export default function AllOrders() {
    const [orders, setOrders] = useState<OrderItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function fetchOrders() {
        try {
            const res = await getUserOrders()

            if (Array.isArray(res)) {
                setOrders(res)
            } else if (res && Array.isArray(res.data)) {
                setOrders(res.data)
            } else if (res && res.status === "fail") {
                toast.error(res.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Error loading orders")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Fetching your orders...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                            <ShoppingBag className="w-8 h-8 mr-3 text-red-600" />
                            My Order History
                        </h1>
                        <p className="text-gray-500 mt-1">Review and track your recent purchases</p>
                    </div>
                    <Link href="/products" className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        Continue Shopping
                    </Link>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">

                                <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex gap-10">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order Identifier</p>
                                                <p className="text-sm font-bold text-gray-900">#{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order Date</p>
                                                <div className="flex items-center text-sm font-medium text-gray-700">
                                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                                                <p className="text-sm font-extrabold text-red-600">{order.totalOrderPrice.toLocaleString()} EGP</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                                {order.isPaid ? (
                                                    <><CheckCircle2 className="w-3 h-3 mr-1.5" /> Paid</>
                                                ) : (
                                                    <><Clock className="w-3 h-3 mr-1.5" /> Pending Payment</>
                                                )}
                                            </div>
                                            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${order.isDelivered ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                                                {order.isDelivered ? (
                                                    <><Package className="w-3 h-3 mr-1.5" /> Delivered</>
                                                ) : (
                                                    <><Truck className="w-3 h-3 mr-1.5" /> In Transit</>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {order.cartItems.map((item) => (
                                            <div key={item._id} className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/20 group-hover:bg-white transition-colors">
                                                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg p-2 border border-gray-100 relative">
                                                    <Image src={item.product.imageCover} alt={item.product.title} fill className="object-contain p-2" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{item.product.title}</h4>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded text-gray-600">Qty: {item.count}</span>
                                                        <span className="text-sm font-bold text-red-600">{item.price} EGP</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center text-gray-500 text-xs font-medium">
                                        <Truck className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>Shipping to: <strong className="text-gray-800">{order.shippingAddress.city}</strong>, {order.shippingAddress.details}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center text-xs font-bold text-gray-400">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            {order.paymentMethodType.toUpperCase()}
                                        </div>
                                        <button className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center group/btn">
                                            Order Details
                                            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-red-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Looks like you haven&apos;t placed any orders yet. Start exploring our amazing collection!</p>
                        <Link href="/products" className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-2xl font-extrabold shadow-xl shadow-red-100 hover:bg-red-700 transition-all active:scale-95">
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

