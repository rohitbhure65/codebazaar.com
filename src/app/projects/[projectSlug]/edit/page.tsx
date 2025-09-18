import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../../queries/getProject";
import { EditProject } from "../../components/EditProject";
import { Skeleton } from "@/components/ui/skeleton"

type EditProjectPageProps = {
  params: Promise<{ projectSlug: string }>;
};

export async function generateMetadata(
  props: EditProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Project = await invoke(getProject, { slug: params.projectSlug });
  return {
    title: `Edit Project ${Project.id} - ${Project.title}`,
  };
}

export default async function Page(props: EditProjectPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={        <div className="max-w-6xl mx-auto p-10 space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 space-y-4">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>

            <div className="md:w-1/2 space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-md" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-1/4 rounded-md" />
              </div>
              <Skeleton className="h-10 w-1/4 rounded-md" />
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-4">
                <Skeleton className="h-6 w-1/3 rounded-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Skeleton className="h-5 rounded-full w-5" />
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>}>
        <EditProject projectSlug={params.projectSlug} />
      </Suspense>
    </div>
  );
}
