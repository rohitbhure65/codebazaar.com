"use client";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getProjects from "../queries/getProjects";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { Route } from "next";
import Image from "next/image";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";

import { ProjectFilters } from "./ProjectFilters";
import { PriceDisplay } from "./PriceDisplay";

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
    maxPrice: 100000,
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
  const whereClause = useMemo(() => {
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
  }, [debouncedSearchTerm, debouncedFilters]);

  const [{ projects, count }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: whereClause,
  });

  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = useCallback((_: any, page: number) => {
    const params = new URLSearchParams(searchparams);
    params.set("page", page.toString());
    router.push((pathname + "?" + params.toString()) as Route);
  }, [searchparams, router, pathname]);

  // Reset page to 1 when search term or filters change
  useEffect(() => {
    const params = new URLSearchParams(searchparams);
    params.set("page", "1");
    router.push((pathname + "?" + params.toString()) as Route);
  }, [debouncedSearchTerm, debouncedFilters, pathname, router, searchparams]);

  // Calculate total pages
  const totalPages = useMemo(() => Math.ceil(count / ITEMS_PER_PAGE), [count]);

  return (
    <Box component="section" sx={{ py: { xs: 5, sm: 8, lg: 5 } }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
          <Box sx={{ width: '100%', flex: { sm: 1 } }}>
            <ProjectFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
            />
          </Box>

          <Box sx={{ width: '100%', flex: { sm: 3 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1 }}>
              {projects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.id}>
                  <Box sx={{ boxShadow: 2, borderRadius: 1, overflow: 'hidden', bgcolor: 'white', mt: 2.5 }}>
                    <Box sx={{ bgcolor: 'white', '&:hover': { boxShadow: 3 }, transition: 'box-shadow 0.2s' }}>
                      <Box sx={{ height: { xs: 320, md: 128 }, bgcolor: 'grey.200', mb: 0.75, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {project.projectImage ? (
                          <Image
                            src={project.projectImage}
                            alt={project.title}
                            width={600}
                            height={300}
                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            loading="lazy"
                          />
                        ) : (
                          <Typography color="text.secondary">No Image</Typography>
                        )}
                      </Box>

                      <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.25rem', md: '0.875rem' } }}>
                          {(project.title)?.slice(0, 60) + ((project.title)?.length > 60 ? "..." : "")}
                        </Typography>
                        <Box sx={{ color: 'warning.main', mb: 0.5 }}>★ ★ ★ ★ ★</Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '1.125rem', md: '0.75rem' } }}>
                          {(project.description || "No description available.").length > 60
                            ? (project.description || "").slice(0, 60) + "..."
                            : project.description || "No description available."}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                            <Box sx={{ fontSize: { xs: '1.875rem', md: '1.25rem' }, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <PriceDisplay price={project.price} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>

            {projects.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Box sx={{ boxShadow: 2, borderRadius: 1, overflow: 'hidden', bgcolor: 'white', mt: 2.5, p: 3 }}>
                  <Box sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}>
                    <Image
                      src="/find.svg"
                      alt="No projects found"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary">No Project available</Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};