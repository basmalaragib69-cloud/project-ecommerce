"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getCategoryDetails } from '@/api/categories.api';
import { Category } from '@/type/product.type';

export default function CategoryDetails() {
    const params = useParams();
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (params?.id) {
                try {
                    const data = await getCategoryDetails(params.id as string);
                    setCategory(data);
                } catch (error) {
                    console.error("Failed to fetch category details:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchData();
    }, [params?.id]);

    if (isLoading) return <div className="p-20 text-center text-xl font-medium text-gray-600 animate-pulse">Loading Category...</div>;
    if (!category) return <div className="p-20 text-center text-xl font-medium text-red-600">Category not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={384}
                            height={384}
                            className="h-96 w-full object-cover md:w-96"
                        />
                    </div>
                    <div className="p-12 flex flex-col justify-center">
                        <div className="uppercase tracking-wide text-sm text-red-600 font-semibold mb-2">Category Details</div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{category.name}</h1>
                        <p className="text-gray-500 mb-8">
                            Explore our wide range of products in the <span className="font-bold text-gray-700">{category.name}</span> category.
                            Find the best deals and high-quality items curated just for you.
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                            <span className="mr-2">Category ID:</span>
                            <code className="bg-gray-100 px-2 py-1 rounded">{params.id}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
