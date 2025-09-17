"use client";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getProjects from "../queries/getProjects";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { Route } from "next";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import { TextField, Slider } from '@mui/material';


const ITEMS_PER_PAGE = 8;

export const ProjectsList = () => {
  const searchparams = useSearchParams()!;
  const page = Number(searchparams.get("page")) || 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [filters, setFilters] = useState({
    category: '',
    tags: '',
    techStack: '',
    minPrice: 0,
    maxPrice: 10000,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, filters]);

  // Build where clause
  const buildWhere = () => {
    let where: any = {};

    if (debouncedSearchTerm) {
      where.OR = [
        { title: { contains: debouncedSearchTerm, mode: "insensitive" } },
        { metaDescription: { contains: debouncedSearchTerm, mode: "insensitive" } },
      ];
    }

    if (debouncedFilters.category) {
      const catArray = debouncedFilters.category.split(',').map(c => c.trim()).filter(c => c);
      if (catArray.length > 0) {
        where.category = { hasSome: catArray };
      }
    }

    if (debouncedFilters.tags) {
      const tagArray = debouncedFilters.tags.split(',').map(t => t.trim()).filter(t => t);
      if (tagArray.length > 0) {
        where.tags = { hasSome: tagArray };
      }
    }

    if (debouncedFilters.techStack) {
      const techArray = debouncedFilters.techStack.split(',').map(t => t.trim()).filter(t => t);
      if (techArray.length > 0) {
        where.techStack = { hasSome: techArray };
      }
    }

    where.price = { gte: debouncedFilters.minPrice, lte: debouncedFilters.maxPrice };

    return Object.keys(where).length > 0 ? where : undefined;
  };

  const [{ projects, count }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: buildWhere(),
  });

  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (_: any, page: number) => {
    const params = new URLSearchParams(searchparams);
    params.set("page", page.toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };

  // Reset page to 1 when search term or filters change
  useEffect(() => {
    const params = new URLSearchParams(searchparams);
    params.set("page", "1");
    router.push((pathname + "?" + params.toString()) as Route);
  }, [debouncedSearchTerm, debouncedFilters]);

  // Calculate total pages
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <section className="py-10 sm:py-16 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid size={3}>
              <div className="w-full shadow-lg rounded-lg mt-10 p-4 max-h-screen overflow-y-auto">
                <TextField
                  fullWidth
                  label="Search projects"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Category (comma-separated)"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tags (comma-separated)"
                  value={filters.tags}
                  onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tech Stack (comma-separated)"
                  value={filters.techStack}
                  onChange={(e) => setFilters({ ...filters, techStack: e.target.value })}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Min Price"
                  type="number"
                  value={filters.minPrice.toString()}
                  onChange={(e) => setFilters({ ...filters, minPrice: parseFloat(e.target.value) || 0 })}
                  inputProps={{ min: 0, max: 10000, step: 10 }}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Max Price"
                  type="number"
                  value={filters.maxPrice.toString()}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseFloat(e.target.value) || 10000 })}
                  inputProps={{ min: 0, max: 10000, step: 10 }}
                  variant="outlined"
                  size="small"
                  margin="normal"
                />
                <div style={{ margin: '16px 0' }}>
                  <label>Price Range: ${filters.minPrice} - ${filters.maxPrice}</label>
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={(e, newValue) => setFilters({ ...filters, minPrice: newValue[0], maxPrice: newValue[1] })}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    step={10}
                  />
                </div>
              </div>
            </Grid>
            <Grid size={8}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.id}>
                    <div className="shadow-lg rounded-lg overflow-hidden bg-white mt-10">
                      <div className="bg-white hover:shadow-md transition-shadow duration-200">
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
                          <h3 className="font-semibold text-gray-800 text-sm mb-2">{project.title}</h3>

                          <p className="text-xs text-gray-500 mb-2">
                            {(project.description || "No description available.").length > 30
                              ? (project.description || "").slice(0, 40) + "..."
                              : project.description || "No description available."}
                          </p>

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
                  </Link>
                ))}
              </div>
              {projects.length === 0 && (
                <div className="text-center py-10">
                  <div className="shadow-lg rounded-lg overflow-hidden bg-white mt-10 p-8">
                    <div className="w-[200px] h-[200px] mx-auto mb-4">

                      <img src="find.svg" alt="" />
                    </div>
                    <p className="text-gray-500 text-lg">No Project available</p>
                  </div>
                </div>
              )}

              {/* MUI Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section >
  );
};
