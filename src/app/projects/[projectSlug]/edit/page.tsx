import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../../queries/getProject";
import getCurrentUser from "../../../users/queries/getCurrentUser";
import { EditProject } from "../../components/EditProject";
import Loader from "@/components/ui/loader";
import { redirect } from "next/navigation";

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

  // Get current user and project data for authorization
  const [currentUser, project] = await Promise.all([
    invoke(getCurrentUser, null),
    invoke(getProject, { slug: params.projectSlug })
  ]);

  // Server-side authorization check
  if (currentUser && project && currentUser.id !== project.userId) {
    redirect('/access-denied');
  }

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <EditProject projectSlug={params.projectSlug} />
      </Suspense>
    </div>
  );
}
