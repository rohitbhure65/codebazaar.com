import { Metadata } from "next";
import { Suspense } from "react";
import { New__ModelName } from "../components/NewProject";
import Loader from "@/components/ui/loader";

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
};

export default function Page() {
  return (
    <div>
      <h1>Create New Project</h1>
      <Suspense fallback={<Loader />}>
        <New__ModelName />
      </Suspense>
    </div>
  );
}
