"use client"
import React, { useEffect, useState } from 'react'
import { getUserAddresses, addAddress, removeAddress } from '@/addressActions/address.actions'
import { toast } from 'sonner'

interface Address {
    _id: string;
    name: string;
    city: string;
    details: string;
    phone: string;
}

export default function AddressPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        details: '',
        phone: '',
        city: ''
    })

    async function fetchAddresses() {
        try {
            const res = await getUserAddresses()
            if (res.status === "success") {
                setAddresses(res.data)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to load addresses")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    async function handleAddAddress(e: React.FormEvent) {
        e.preventDefault()
        setIsAdding(true)
        try {
            const res = await addAddress(formData)
            if (res.status === "success") {
                toast.success("Address added successfully")
                setAddresses(res.data)
                setFormData({ name: '', details: '', phone: '', city: '' })
            }
        } catch (error) {
            console.error(error)
            toast.error("Error adding address")
        } finally {
            setIsAdding(false)
        }
    }

    async function handleRemove(id: string) {
        try {
            const res = await removeAddress(id)
            if (res.status === "success") {
                toast.success("Address removed")
                setAddresses(res.data)
            }
        } catch (error) {
            console.error(error)
            toast.error("Error removing address")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <i className="fas fa-spinner fa-spin text-3xl text-red-600"></i>
            </div>
        )
    }

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Addresses</h1>


                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Address</h2>
                    <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            required
                            placeholder="Address Name (e.g. Home, Work)"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        <input
                            required
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        <input
                            required
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        <input
                            required
                            placeholder="Detailed Address"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        <button
                            disabled={isAdding}
                            className="md:col-span-2 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                        >
                            {isAdding ? <i className="fas fa-spinner fa-spin mr-2"></i> : "Add Address"}
                        </button>
                    </form>
                </div>


                <div className="space-y-4">
                    {addresses.length > 0 ? (
                        addresses.map((addr) => (
                            <div key={addr._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-800">{addr.name}</h3>
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{addr.city}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{addr.details}</p>
                                    <p className="text-xs text-gray-400 mt-1"><i className="fa-solid fa-phone mr-1"></i> {addr.phone}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(addr._id)}
                                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-400 italic">No addresses saved yet.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
