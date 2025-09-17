import { Metadata } from "next";
// import Link from "next/link";
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
      {/* <p>
        <Link href={"/projects/new"}>Create Project</Link>
      </p> */}
      <Suspense fallback={<section className="py-10 sm:py-16 lg:py-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
            <Skeleton className="h-[227px] w-[268px] mt-10 rounded-xl" />
          </div>
        </div>
      </section>
      }>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
