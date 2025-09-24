import Image from "next/image";

interface User {
    id: number;
    name: string | null;
    email: string;
    user: {
        profilePic: string | null;
        bio: string | null;
    } | null;
}

interface ProfileCardProps {
    user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
    const displayName = user.name || "Anonymous User";
    const profilePic = user.user?.profilePic || "https://imgs.search.brave.com/KU40rN8bw6uW6VCkfaN0eWvpyt2NNTPlATZDXlg-sqM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE2LzA1LzQ1LzM2/LzM2MF9GXzE2MDU0/NTM2MTlfZGxOUWFl/ZjNCbmEwdTdKRTVV/blpmUmp6clRxeVlr/WWguanBn";
    const bio = user.user?.bio || "No bio available.";

    return (
        <div className="max-w-full mx-auto border border-gray-200 shadow-md mt-10 rounded-lg p-6 flex flex-col text-center md:text-left md:flex-row items-center gap-6 bg-white">
            <div className="flex-shrink-0">
                <Image
                    src={profilePic}
                    alt={displayName}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
            </div>

            <div>
                <h2 className="text-lg font-bold">{displayName.toUpperCase()}</h2>
                <p className="text-gray-600 mt-1 text-sm">
                    {bio}
                </p>
                {/* <div className="mt-3 flex justify-center md:justify-start items-center gap-3 text-sm font-medium text-gray-900">
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
                </div> */}
            </div>
        </div>
    );
}
