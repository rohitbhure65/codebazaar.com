"use client"
import { AnimatedListDemo } from "./AnimatedList";
import { useGsapBlocks } from "./ui/useGsap";

const AnimatedFeature = () => {
    useGsapBlocks()
    return (
        <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                    <div className="xl:col-span-3 xl:mr-20 block-appear relative">
                        <AnimatedListDemo />
                    </div>
                    <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                        <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight font-pj">
                                Empower Your Coding Journey with Codebazaar
                            </h1>
                            <p className="mt-6 text-lg text-gray-600">
                                Unlock the power of code with Codebazaar - Your ultimate destination for free, high-quality programming resources. Explore a vast collection of code snippets, libraries, and frameworks to supercharge your development projects. Whether you&apos;re a beginner or a seasoned coder, Codebazaar has something for everyone. Start coding smarter, faster, and better today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AnimatedFeature;