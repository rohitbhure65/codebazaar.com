import { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsList } from "./components/ProjectsList";
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Projects",
  description: "List of projects",
};

export default function Page() {
  return (
    <div>
      <Suspense fallback={<section className="py-10 sm:py-16 lg:py-10">
        <div className="max-w-6xl flex mx-auto px-4 py-6">
            <Skeleton className="h-[407px] w-[294px] mt-10 rounded-xl" />
          <div className="grid grid-cols-2 ml-4 md:grid-cols-4 gap-4">
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
            <Skeleton className="h-[252px] w-[193px] mt-10 rounded-xl" />
          </div>
        </div>
      </section>
      }>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
