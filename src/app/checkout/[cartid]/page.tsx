"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { checkouthoome, checkoutType } from '@/schema/checkout'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { checkPayment, createCashOrder } from '@/cartActions/checkout.action'
import { getUserCart } from '@/cartActions/getUserCart.action'
import { CartContext } from '@/context/cartContext'
import Link from 'next/link'

export default function Checkout() {
    const { cartid } = useParams()
    const router = useRouter()
    const { setnumber } = useContext(CartContext)!
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online')
    const [cartDetails, setCartDetails] = useState<{ totalCartPrice: number, products: Array<{ _id: string, count: number, product: { title: string, imageCover: string } }> } | null>(null)
    const [isLoadingCart, setIsLoadingCart] = useState(true)

    const form = useForm<checkoutType>({
        defaultValues: {
            details: "",
            phone: "",
            city: "",
        },
        resolver: zodResolver(checkouthoome)
    })

    const { handleSubmit, formState: { isSubmitting } } = form

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await getUserCart() as { status: string, data: { totalCartPrice: number, products: Array<{ _id: string, count: number, product: { title: string, imageCover: string } }> } }
                if (res.status === "success") {
                    setCartDetails(res.data)
                }
            } catch (error) {
                console.error("Error fetching cart summary:", error)
            } finally {
                setIsLoadingCart(false)
            }
        }
        fetchCart()
    }, [])

    async function handleCheckout(value: checkoutType) {
        try {
            if (paymentMethod === 'online') {
                const baseUrl = window.location.origin
                const response = await checkPayment(cartid as string, value, baseUrl)

                if (response.status === "success") {
                    toast.success("Redirecting to secure payment...")
                    window.location.assign(response.session.url)
                } else {
                    toast.error(response.message || "Online payment failed to initialize")
                }
            } else {
                const response = await createCashOrder(cartid as string, value)
                if (response.status === "success") {
                    toast.success("Order placed successfully!")
                    setnumber(0)
                    router.push("/allorders")
                } else {
                    toast.error(response.message || "Failed to place order")
                }
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred. Please try again.")
        }
    }

    if (isLoadingCart) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-white text-[#1a1f36]'>
            <div className='flex flex-col lg:flex-row min-h-screen'>


                <div className='lg:w-[45%] bg-white p-12 lg:p-24 flex flex-col justify-between border-r border-gray-50'>
                    <div>
                        <Link href="/carts" className="inline-flex items-center text-gray-400 hover:text-gray-600 transition-colors mb-20 group">
                            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        </Link>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                                <i className="fa-solid fa-cart-arrow-down text-white text-xl"></i>
                            </div>
                            <span className="font-bold text-gray-400 text-sm">FreshCart</span>
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-2">Test Mode</span>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-gray-500 font-medium text-lg mb-2">Order Total</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-extrabold tracking-tight">EGP {cartDetails?.totalCartPrice.toLocaleString()}.00</span>
                            </div>
                        </div>

                        <div className="mt-12 space-y-4">
                            {cartDetails?.products.slice(0, 3).map((item) => (
                                <div key={item._id} className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="w-12 h-12 rounded border p-1 bg-white">
                                        <Image src={item.product.imageCover} alt={item.product.title} width={48} height={48} className="w-full h-full object-contain" />
                                    </div>
                                    <span className="flex-1 truncate font-medium">{item.product.title}</span>
                                    <span className="font-bold">x{item.count}</span>
                                </div>
                            ))}
                            {cartDetails?.products && cartDetails.products.length > 3 && (
                                <p className="text-xs text-blue-600 font-semibold pl-16">+ {cartDetails.products.length - 3} more items</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-20 flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                            <span>Powered by</span>
                            <span className="text-gray-600">Stripe</span>
                        </div>
                        <span className="hover:text-gray-600 cursor-pointer">Terms</span>
                        <span className="hover:text-gray-600 cursor-pointer">Privacy</span>
                    </div>
                </div>


                <div className='lg:w-[55%] bg-white p-12 lg:p-24 max-w-2xl'>
                    <h1 className='text-2xl font-bold mb-8'>Complete your order</h1>

                    <div className='mb-10'>
                        <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider">Payment Method</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('online')}
                                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50/20 text-blue-900' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                <CreditCard className="w-5 h-5" />
                                <span className="text-sm font-bold">Credit Card</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all ${paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50/20 text-blue-900' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                <Wallet className="w-5 h-5" />
                                <span className="text-sm font-bold">Cash on Delivery</span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleCheckout)} className='space-y-6'>
                        <FieldGroup className="space-y-5">
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-bold text-gray-600 mb-2 block uppercase tracking-wider">City</FieldLabel>
                                        <Input
                                            placeholder="Enter city"
                                            className="w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50/30 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium h-12"
                                            {...field}
                                        />
                                        {fieldState.invalid && <p className="text-red-500 text-xs mt-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="details"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-bold text-gray-600 mb-2 block uppercase tracking-wider">Shipping Address</FieldLabel>
                                        <Input
                                            placeholder="123 Street Name, Building, Floor..."
                                            className="w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50/30 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium h-12"
                                            {...field}
                                        />
                                        {fieldState.invalid && <p className="text-red-500 text-xs mt-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-bold text-gray-600 mb-2 block uppercase tracking-wider">Contact Phone</FieldLabel>
                                        <Input
                                            placeholder="01xxxxxxxxx"
                                            className="w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50/30 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium h-12"
                                            {...field}
                                        />
                                        {fieldState.invalid && <p className="text-red-500 text-xs mt-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <div className="pt-4">
                            <Button
                                className='w-full bg-[#0070f3] hover:bg-[#0061d5] text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-95 text-base h-14'
                                type='submit'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <><i className="fas fa-spinner fa-spin mr-3"></i> Processing...</>
                                ) : (
                                    paymentMethod === 'online' ? "Pay with Stripe" : "Place Order (Cash)"
                                )}
                            </Button>
                            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
                                Secure Transaction
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


