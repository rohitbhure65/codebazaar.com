.
├── code-structure.md
├── components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProjectShowCase.tsx
│   ├── State.tsx
│   ├── Testimonial.tsx
│   └── ui
│       ├── Count.tsx
│       ├── skeleton.tsx
│       └── TextType.tsx
├── components.json
├── db
│   ├── db.sqlite
│   ├── db.sqlite-journal
│   ├── dev.db
│   ├── index.ts
│   ├── migrations
│   │   ├── 20241031081726_
│   │   │   └── migration.sql
│   │   ├── 20250916121818_add_task_enums
│   │   │   └── migration.sql
│   │   ├── 20250916134850_
│   │   │   └── migration.sql
│   │   ├── 20250916142640_your_change_name
│   │   │   └── migration.sql
│   │   ├── 20250916171933_
│   │   │   └── migration.sql
│   │   ├── 20250917035510_init
│   │   │   └── migration.sql
│   │   ├── 20250917061123_
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── integrations
├── lib
│   └── utils.ts
├── mailers
│   └── forgotPasswordMailer.ts
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── find.svg
├── README.md
├── src
│   └── app
│       ├── api
│       │   └── rpc
│       │       └── [[...blitz]]
│       │           └── route.ts
│       ├── (auth)
│       │   ├── components
│       │   │   ├── ForgotPasswordForm.tsx
│       │   │   ├── LoginForm.tsx
│       │   │   ├── LogoutButton.tsx
│       │   │   ├── ResetPasswordForm.tsx
│       │   │   └── SignupForm.tsx
│       │   ├── forgot-password
│       │   │   └── page.tsx
│       │   ├── layout.tsx
│       │   ├── login
│       │   │   └── page.tsx
│       │   ├── mutations
│       │   │   ├── changePassword.ts
│       │   │   ├── forgotPassword.test.ts
│       │   │   ├── forgotPassword.ts
│       │   │   ├── login.ts
│       │   │   ├── logout.ts
│       │   │   ├── resetPassword.test.ts
│       │   │   ├── resetPassword.ts
│       │   │   └── signup.ts
│       │   ├── reset-password
│       │   │   └── page.tsx
│       │   ├── signup
│       │   │   └── page.tsx
│       │   └── validations.ts
│       ├── blitz-auth-config.ts
│       ├── blitz-client.ts
│       ├── blitz-server.ts
│       ├── components
│       │   ├── Form.tsx
│       │   ├── LabeledCheckbox.tsx
│       │   └── LabeledTextField.tsx
│       ├── error.tsx
│       ├── layout.tsx
│       ├── loading.tsx
│       ├── page.tsx
│       ├── projects
│       │   ├── components
│       │   │   ├── EditProject.tsx
│       │   │   ├── NewProject.tsx
│       │   │   ├── ProjectForm.tsx
│       │   │   ├── ProjectsList.tsx
│       │   │   └── Project.tsx
│       │   ├── layout.tsx
│       │   ├── mutations
│       │   │   ├── createProject.ts
│       │   │   ├── deleteProject.ts
│       │   │   └── updateProject.ts
│       │   ├── new
│       │   │   └── page.tsx
│       │   ├── page.tsx
│       │   ├── [projectSlug]
│       │   │   ├── edit
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── queries
│       │   │   ├── getProjects.ts
│       │   │   └── getProject.ts
│       │   └── schemas.ts
│       ├── styles
│       │   └── globals.css
│       └── users
│           ├── hooks
│           │   └── useCurrentUser.ts
│           └── queries
│               ├── getCurrentUser.ts
│               ├── getUsers.ts
│               └── getUsersWithoutProjects.ts
├── tailwind.config.js
├── tsconfig.json
└── types.ts

40 directories, 88 files
