"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from "next/image";
import { useThemeMode } from "./ui/ThemeProvider";
import { LogoutButton } from '@/src/app/(auth)/components/LogoutButton';
import { useCurrentUser } from '@/src/app/users/hooks/useCurrentUser';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { mode, toggleMode } = useThemeMode();
    const user = useCurrentUser();

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

                        {/* Mobile controls */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                type="button"
                                className="text-gray-900"
                                aria-label="Toggle theme"
                                onClick={toggleMode}
                            >
                                {mode === 'dark' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75a9.75 9.75 0 0 1-9.75-9.75 9.718 9.718 0 0 1 6.748-9.252.75.75 0 0 1 .951.94 8.25 8.25 0 0 0 10.113 10.113.75.75 0 0 1 .94.951z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z" /><path fillRule="evenodd" d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5zm0 18.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V21a.75.75 0 0 1 .75-.75zM3.97 4.72a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 1 1-1.06 1.061L3.97 5.78a.75.75 0 0 1 0-1.06zm13.94 13.94a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 1 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061zM1.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H2.25A.75.75 0 0 1 1.5 12zm18.75 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zM3.97 18.22a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 1 1-1.06 1.061L3.97 19.28a.75.75 0 0 1 0-1.06zM19.97 4.72a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 1 1-1.06 1.061L19.97 5.78a.75.75 0 0 1 0-1.06z" clipRule="evenodd" /></svg>
                                )}
                            </button>
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
                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-5">
                            <div className="flex items-center space-x-12">
                                <Link href="/projects" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"> Project </Link>
                            </div>

                            <div className="w-px h-5 bg-gray-300"></div>


                            <button
                                onClick={toggleMode}
                                title="Toggle theme"
                                className="px-3 py-2 rounded-xl border border-gray-300 text-gray-900 transition hover:bg-gray-100"
                            >
                                {mode === 'dark' ? 'Light' : 'Dark'} Mode
                            </button>

                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        title=""
                                        className="px-3 py-2 rounded-xl border border-gray-300 text-gray-900 transition hover:bg-gray-100"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        title=""
                                        className="px-3 py-2 rounded-xl border border-gray-300 text-gray-900 transition hover:bg-gray-100"
                                        role="button"
                                    >
                                        Create free account
                                    </Link>
                                </>
                            ) : (
                                <LogoutButton />
                            )}

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

                                <button
                                    onClick={() => { toggleMode(); closeMenu(); }}
                                    className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white text-center"
                                >
                                    Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
                                </button>

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