import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../../queries/getProject";
import { EditProject } from "../../components/EditProject";

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
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject projectSlug={params.projectSlug} />
      </Suspense>
    </div>
  );
}
