# Code Optimization Tasks

## Completed

- [x] Analyze open files (DeleteProjectButton.tsx, SignupForm.tsx, constants.ts)
- [x] Identify optimization areas: error handling, security, performance

## In Progress

- [x] Update lib/constants.ts: Replace hardcoded X_CSCAPI_KEY with env variable
- [x] Update src/app/(auth)/components/SignupForm.tsx: Remove console.error, improve UI error display, integrate city validation into form schema
- [x] Update src/app/projects/components/DeleteProjectButton.tsx: Remove console.error, replace alert() with modal error, memoize totalRelatedRecords

## Pending

- [ ] Address TODOs in project mutations/queries: Add user ownership validation
- [ ] Run lint and build checks
- [ ] Test signup form and delete button functionality
