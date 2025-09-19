"use client"
import React from 'react';
import { useGsapBlocks } from "./ui/useGsap";

interface Product {
    id: number;
    name: string;
    currentPrice: string;
    originalPrice: string | null;
    discount: string | null;
}

const CompactProductCard = ({ product }: { product: Product }) => {
    const { name, currentPrice, originalPrice, discount } = product;

    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white mt-10">
            <div className="bg-white hover:shadow-md transition-shadow duration-200 ">
                <div className="h-32  bg-gray-200 mb-3 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                </div>
                <div className="content-card p-4">

                    <h3 className="font-semibold text-gray-800 text-sm mb-2">{name}</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${currentPrice}</span>
                            {originalPrice && (
                                <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
                            )}
                        </div>

                        {discount && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                                {discount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectShowCase = () => {
    useGsapBlocks()
    const products: Product[] = [
        {
            id: 1,
            name: "Winter Boys Jacket",
            currentPrice: "192.00",
            originalPrice: "239.00",
            discount: "20% OFF"
        },
        {
            id: 2,
            name: "Winter Boys Jacket",
            currentPrice: "19.99",
            originalPrice: null,
            discount: null
        },
        {
            id: 3,
            name: "Winter Boys Jacket",
            currentPrice: "39.00",
            originalPrice: "69.00",
            discount: "40% OFF"
        },
        {
            id: 4,
            name: "Winter Boys Jacket",
            currentPrice: "49.00",
            originalPrice: null,
            discount: null
        }
    ];

    return (
        <section className="py-10 sm:py-16 lg:py-24">

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">Pricing &amp; Plans</h2>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <CompactProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectShowCase;