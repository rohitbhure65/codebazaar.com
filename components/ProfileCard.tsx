import Image from "next/image";

export default function ProfileCard() {
    return (
        <div className="max-w-full mx-auto border border-gray-200 shadow-md mt-10 rounded-lg p-6 flex items-center gap-6 bg-white">
            <div className="flex-shrink-0">
                <Image
                    src="https://imgs.search.brave.com/zCBTybWd27lVr69cxKO1Wz7-YD9cYkLb_nCJQV5ttjg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci1j/YXJ0b29uLWF2YXRh/ci5qcGc"
                    alt="Atron Calery"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
            </div>

            <div>
                <h2 className="text-lg font-bold">ATRON CALERY</h2>
                <p className="text-gray-600 mt-1 text-sm">
                    Lorem ipsum dolor sit amet, cons tetur adipiscing elit. Orci commodo,
                    elit sit enim blandit enim sit molestie aana.
                </p>
                <div className="mt-3 flex items-center gap-3 text-sm font-medium text-gray-900">
                    <a href="#" className="hover:text-blue-600">
                        Website
                    </a>
                    <span>|</span>
                    <a href="#" className="hover:text-blue-600">
                        Twitter
                    </a>
                    <span>|</span>
                    <a href="#" className="hover:text-blue-600">
                        Dribbble
                    </a>
                </div>
            </div>
        </div>
    );
}
