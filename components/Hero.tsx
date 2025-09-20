"use client"
import TextType from 'components/ui/TextType';
import { CpuArchitecture } from './ui/cpu-architecture';
import Image from "next/image";
import { useGsapBlocks } from "./ui/useGsap";

const Hero = ({ user }) => {

    const { name } = user || {}

    useGsapBlocks()
    return (
        <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                    <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                        <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                                <TextType
                                    text={[`Welcom I am Happy to See You Again 😊 ${name || ''}`, "Get meaningful feedbacks on your code", "Get meaningful feedbacks on your code", "Get meaningful feedbacks on your code!"]}
                                    typingSpeed={100}
                                    pauseDuration={1500}
                                    showCursor={true}
                                    cursorCharacter="|"
                                />
                            </h1>

                            <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                                <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                                    <Image
                                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                                        src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                                        alt="codebazaar.com"
                                        width={56}
                                        height={56}
                                        loading="lazy"
                                    />
                                    <Image
                                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                                        src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                                        alt="codebazaar.com"
                                        width={56}
                                        height={56}
                                        loading="lazy"
                                    />
                                    <Image
                                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                                        src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                                        alt="codebazaar.com"
                                        width={56}
                                        height={56}
                                        loading="lazy"
                                    />
                                </div>

                                <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">Join with <span className="font-bold">4600+ Developers</span> and start getting feedbacks right now</p>
                            </div>
                        </div>

                        <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                            <a
                                href="#"
                                title=""
                                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                                role="button"
                            >
                                Get feedback
                            </a>

                            <a
                                href="#"
                                title=""
                                className="
                                inline-flex
                                items-center
                                px-4
                                py-4
                                mt-4
                                text-lg
                                font-bold
                                transition-all
                                duration-200
                                bg-transparent
                                border border-transparent
                                sm:mt-0
                                font-pj
                                justif-center
                                rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                                hover:bg-gray-200
                                focus:bg-gray-200
                            "
                                role="button"
                            >
                                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Download iOS App
                            </a>
                        </div>
                    </div>

                    <div className="xl:col-span-3 block-appear relative">
                        {/* <Image
                            className="w-full mx-auto scale-110"
                            src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png"
                            alt="codebazaar.com"
                            fill
                            style={{ objectFit: 'contain' }}
                            loading="lazy"
                        /> */}
                        <CpuArchitecture />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Hero;