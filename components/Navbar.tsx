"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from "next/image";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="relative bg-gray-50">
            <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
                <Image
                    fill
                    style={{ objectFit: 'cover' }}
                    src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
                    alt="codebazaar.com"
                    loading="lazy"
                />
            </div>

            <header className="relative py-4 md:py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" title="" className="flex">
                                <Image
                                    className="w-auto h-8"
                                    src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg"
                                    alt="codebazaar.com"
                                    width={120}
                                    height={32}
                                    loading="lazy"
                                />
                            </Link>
                            <span className="ml-3 relative flex size-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                            </span>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="text-gray-900"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                            <div className="flex items-center space-x-12">
                                <Link href="/projects" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"> Project </Link>
                            </div>

                            <div className="w-px h-5 bg-gray-300"></div>

                            <Link href="/login" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"> Login </Link>

                            <Link
                                href="/signup"
                                title=""
                                className="
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border border-gray-900
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-900 hover:text-white
                            focus:bg-gray-900 focus:text-white
                        "
                                role="button"
                            >
                                Create free account
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/projects"
                                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                    onClick={closeMenu}
                                >
                                    Projects
                                </Link>

                                <div className="w-full h-px bg-gray-300 my-2"></div>

                                <Link
                                    href="/login"
                                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    className="
                                        px-5
                                        py-2
                                        text-base
                                        font-semibold
                                        leading-7
                                        text-gray-900
                                        transition-all
                                        duration-200
                                        bg-transparent
                                        border border-gray-900
                                        rounded-xl
                                        font-pj
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                        hover:bg-gray-900 hover:text-white
                                        focus:bg-gray-900 focus:text-white
                                        text-center
                                    "
                                    role="button"
                                    onClick={closeMenu}
                                >
                                    Create free account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Navbar;