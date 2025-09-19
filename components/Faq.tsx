"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useGsapBlocks } from "./ui/useGsap";
import { useThemeMode } from "./ui/ThemeProvider";

const Faq = () => {
    useGsapBlocks()
    const { mode } = useThemeMode()
    const [faq, setFaq] = useState([
        {
            question: 'How to create an account?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <Link href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</Link> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'How can I make payment using Paypal?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <Link href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</Link> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'Can I cancel my plan?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <Link href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</Link> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'How can I reach to support?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <Link href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</Link> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        }
    ]);

    // Generate FAQ schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.replace(/<[^>]*>/g, '') // Remove HTML tags for clean text
            }
        }))
    };

    const toggleFaq = (index: number) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <section className={`py-10 sm:py-16 lg:py-24 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl" data-stagger>
                    <div className="max-w-2xl mx-auto text-center block-appear">
                        <h2 className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>Frequently Asked Questions</h2>
                        <p className={`max-w-xl mx-auto mt-4 text-base leading-relaxed ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
                    </div>

                    <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16" data-stagger>
                        {faq.map((item, index) => (
                            <div key={index} className={`transition-all duration-200 cursor-pointer hover:bg-opacity-80 ${mode === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'} border`}>
                                <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => toggleFaq(index)}>
                                    <span className={`flex text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'}`}> {item.question} </span>

                                    <svg className={`w-6 h-6 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-400'} ${item.open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                    <p className={mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className={`text-center textbase mt-9 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Didn&apos;t find the answer you are looking for? <Link href="/" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</Link></p>
                </div>
            </section>
        </>
    );
}

export default Faq;