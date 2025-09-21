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
      <Suspense fallback={<Loader />}>
        <New__ModelName />
      </Suspense>
    </div>
  );
}
