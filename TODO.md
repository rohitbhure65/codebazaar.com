# TODO: Implement Project Tags and TechStack like ProjectCategory

## Steps:
1. [x] Create `src/app/queries/getTags.ts` and `src/app/hooks/getTags.ts`
2. [x] Create `src/app/queries/getTechStack.ts` and `src/app/hooks/getTechStack.ts`
3. [x] Update `src/app/projects/schemas.ts` to add `tagIds` and `techStackIds`
4. [x] Update `src/app/projects/mutations/createProject.ts` to handle `tagIds` and `techStackIds`
5. [x] Update `src/app/projects/mutations/updateProject.ts` to handle `tagIds` and `techStackIds`
6. [x] Update `src/app/projects/queries/getProjects.ts` to include `ProjectTag` and `ProjectTechStack`
7. [x] Update `src/app/projects/components/ProjectForm.tsx` to include fields for tags and techstack
