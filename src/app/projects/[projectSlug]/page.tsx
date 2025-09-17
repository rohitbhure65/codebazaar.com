import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../queries/getProject";
import { Project } from "../components/Project";

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Project = await invoke(getProject, { slug: params.projectSlug });
  return {
    title: `Project ${Project.id} - ${Project.title}`,
  };
}

type ProjectPageProps = {
  params: Promise<{ projectSlug: string }>;
};

export default async function Page(props: ProjectPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Project projectSlug={params.projectSlug} />
      </Suspense>
    </div>
  );
}
