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
              <div className="bg-white hover:shadow-md transition-shadow duration-200">

                {/* Image or placeholder */}
                <div className="h-32 bg-gray-200 mb-3 flex items-center justify-center">
                  {project.projectImages.length > 0 ? (
                    <img
                      src={project.projectImage}
                      alt={project.title}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                <div className="content-card p-4">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-800 text-sm mb-2">{project.title}</h3>

                  {/* Meta Description or placeholder */}
                  <p className="text-xs text-gray-500 mb-2">
                    {project.metaDescription || "No description available."}
                  </p>

                  {/* Price, Slug, and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <span className="text-lg font-bold text-gray-900">${project.price.toLocaleString()}</span>
                    </div>

                    <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">
                      <Link href={`/projects/${project.slug}/edit`}>Edit</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={page === 0}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={!hasMore}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
