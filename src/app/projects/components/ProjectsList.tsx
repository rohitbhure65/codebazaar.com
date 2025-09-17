"use client";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getProjects from "../queries/getProjects";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Route } from "next";

const ITEMS_PER_PAGE = 8;

export const ProjectsList = () => {
  const searchparams = useSearchParams()!;
  const page = Number(searchparams.get("page")) || 0;
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const router = useRouter();
  const pathname = usePathname();

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page - 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };
  const goToNextPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page + 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="shadow-lg rounded-lg overflow-hidden bg-white mt-10">
              <div className="bg-white hover:shadow-md transition-shadow duration-200 ">
                <div className="h-32  bg-gray-200 mb-3 flex items-center justify-center">
                  <span className="text-gray-500">{project.projectImages}</span>
                </div>
                <div className="content-card p-4">

                  <h3 className="font-semibold text-gray-800 text-sm mb-2">{project.title}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${project.price}</span>
                      <span className="text-lg font-bold text-gray-900">${project.slug}</span>
                      {project.price && (
                        <span className="text-sm text-gray-500 line-through">${project.price}</span>
                      )}
                    </div>
                    <button className=" px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">
                      <Link href={`/projects/${project.slug}/edit`}>Edit</Link>
                    </button>
                    {/* 
                  {discount && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                      {discount}
                    </span>
                  )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </section>
  );
};
