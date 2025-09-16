import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectsList } from "./components/ProjectsList";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Projects",
  description: "List of projects",
};

export default function Page() {
  return (
    <div>
      <Navbar />
      <p>
        <Link href={"/projects/new"}>Create Project</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
