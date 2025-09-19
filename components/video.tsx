"use client"
import { Safari } from "./ui/safari";
import { useGsapBlocks } from "./ui/useGsap";

const Video = () => {
    useGsapBlocks()
    return (
        <section className="relative py-12 mt-36 md:mt-20 sm:py-16 lg:pt-20 lg:pb-36">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <Safari
                    url="codebazaar.com"
                    className="size-full"
                    videoSrc="/website.mp4"
                />
            </div>
        </section>
    )
};

export default Video;