# TODO: Switch Project Operations to Use Slug Instead of ID

## Tasks
- [x] Update updateProject mutation to use slug instead of id
- [x] Update deleteProject mutation to use slug instead of id
- [x] Update UpdateProjectSchema and DeleteProjectSchema to use slug instead of id
- [x] Update Project component to use slug for edit link and delete mutation
- [x] Update EditProject component to use slug for update mutation
- [x] Rename [projectId] folder to [projectSlug] for dynamic routes
- [x] Update any other references to project ID in routes or components

## Followup Steps
- [ ] Test all CRUD operations to ensure they work with slug
- [ ] Update links in other parts of the app if they use project ID
