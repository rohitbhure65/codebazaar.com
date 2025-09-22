import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/ProjectForm";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import { z } from "zod";
export { FORM_ERROR } from "src/app/components/ProjectForm";

import { useCurrentUser } from "src/app/users/hooks/useCurrentUser";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const currentUser = useCurrentUser();

  const initialValues = {
    userId: currentUser?.id,
    title: undefined,
    slug: undefined,
    category: undefined,
    tags: undefined,
    techStack: undefined,
    projectImage: undefined,
    projectImages: undefined,
    fileUrl: undefined,
    price: 0,
    description: undefined,
    features: undefined,
    requirements: undefined,
    metatitle: undefined,
    metaKeywords: undefined,
    metaDescription: undefined,
    robots: "index,follow",
    demoUrl: undefined,
    version: "1.0.0",
    repositoryUrl: undefined,
    videoUrl: undefined,
    visibility: "public",
    isResellAllowed: true,
    isApproved: true,
    views: 0,
    downloads: 0,
    featured: false,
    ...props.initialValues
  };

  const visibilityOptions = [
    { value: "public", label: "public" },
    { value: "private", label: "private" },
  ]

  const robotsOptions = [
    { value: "index,follow", label: "Show in Google" },
    { value: "noindex,nofollow", label: "Don't Show in Google" },
  ]

  return (
    <Form<S> {...props} initialValues={initialValues}>
      <LabeledTextField
        name="title"
        label="Title"
        placeholder="Title"
        type="text"
      />

      <LabeledTextField
        name="description"
        label="Description"
        placeholder="Description"
        type="text"
      />

      <LabeledTextField
        name="category"
        label="Category"
        placeholder="Comma separated categories"
        type="text"
      />

      <LabeledTextField
        name="tags"
        label="Tags"
        placeholder="Comma separated tags"
        type="text"
      />

      <LabeledTextField
        name="techStack"
        label="Tech Stack"
        placeholder="Comma separated tech stack"
        type="text"
      />

      <LabeledTextField
        name="projectImage"
        label="Project Image"
        placeholder="Project Image URL"
        type="text"
      />

      <LabeledTextField
        name="projectImages"
        label="Project Images"
        placeholder="Comma separated image URLs"
        type="text"
      />

      <LabeledTextField
        name="fileUrl"
        label="File URL"
        placeholder="File URL"
        type="text"
      />

      <LabeledTextField
        name="price"
        label="Price in INR"
        placeholder="Price"
        type="number"
      />

      <LabeledTextField
        name="slug"
        label="Slug"
        placeholder="Slug"
        type="text"
      />

      <LabeledTextField
        name="features"
        label="Features"
        placeholder="Features"
        type="text"
      />

      <LabeledTextField
        name="requirements"
        label="Requirements"
        placeholder="Requirements"
        type="text"
      />

      <LabeledTextField
        name="repositoryUrl"
        label="Github Repo URL"
        placeholder="Github Repo URL"
        type="text"
      />

      <LabeledTextField
        name="metaTitle"
        label="Meta Title"
        placeholder="Meta Title (optional)"
        type="text"
      />

      <LabeledTextField
        name="metaDescription"
        label="Meta Description"
        placeholder="Meta Description (optional)"
        type="text"
      />

      <LabeledTextField
        name="metaKeywords"
        label="Meta Keywords"
        placeholder="Meta Keywords (optional)"
        type="text"
      />

      <LabeledTextField
        name="demoUrl"
        label="Demo URL"
        placeholder="Demo URL (optional)"
        type="text"
      />

      <LabeledTextField
        name="videoUrl"
        label="Video URL"
        placeholder="Video URL (optional)"
        type="text"
      />

      <LabeledTextField
        name="visibility"
        label="Visibility"
        placeholder="public/private"
        isSelect={true}
        options={visibilityOptions}
      />

      <LabeledTextField
        name="version"
        label="Version"
        placeholder="Version"
        type="text"
      />

      <LabeledTextField
        name="robots"
        label="Robots"
        placeholder="Robots"
        isSelect={true}
        options={robotsOptions}
      />

      <LabeledTextField
        name="userId"
        label="USER ID"
        isSelect={true}
        disabled={true}
        options={
          currentUser
            ? [{ value: currentUser.id, label: currentUser.name || currentUser.email }]
            : []
        }
      />
      <LabeledCheckbox name="isResellAllowed" label="Is Resell Allowed" defaultChecked={true} />
      <LabeledCheckbox name="isApproved" label="Is Approved" defaultChecked={true} />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
