import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/ProjectForm";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import { z } from "zod";
export { FORM_ERROR } from "src/app/components/ProjectForm";

import { useCurrentUser } from "src/app/users/hooks/useCurrentUser";
import { getcategory } from "../../hooks/getCategory";
import { gettags } from "../../hooks/getTags";
import { gettechstack } from "../../hooks/getTechStack";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const currentUser = useCurrentUser();
  const categoriesData = getcategory();
  const tagsData = gettags();
  const techStacksData = gettechstack();

  // Transform categories to the format expected by LabeledTextField
  const categoryOptions = categoriesData?.map(category => ({
    value: category.id,
    label: category.category
  })) || [];

  const tagOptions = tagsData?.map(tag => ({
    value: tag.id,
    label: tag.tag
  })) || [];

  const techStackOptions = techStacksData?.map(techStack => ({
    value: techStack.id,
    label: techStack.techstack
  })) || [];

  const initialValues = {
    userId: currentUser?.id,
    title: undefined,
    slug: undefined,
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
    visibility: "PUBLIC",
    isResellAllowed: true,
    isApproved: true,
    views: 0,
    downloads: 0,
    featured: false,
    categoryIds: [],
    tagIds: [],
    techStackIds: [],
    ...props.initialValues
  };

  // Extract category IDs from the project data if editing
  const processedInitialValues = {
    ...initialValues,
    categoryIds: props.initialValues?.ProjectCategory?.map((pc: any) => pc.categoryId) || initialValues.categoryIds,
    tagIds: props.initialValues?.ProjectTag?.map((pt: any) => pt.tag.id) || initialValues.tagIds,
    techStackIds: props.initialValues?.ProjectTechStack?.map((pts: any) => pts.techstack.id) || initialValues.techStackIds
  };

  const visibilityOptions = [
    { value: "PUBLIC", label: "PUBLIC" },
    { value: "PRIVATE", label: "PRIVATE" },
  ]

  const robotsOptions = [
    { value: "index,follow", label: "Show in Google" },
    { value: "noindex,nofollow", label: "Don't Show in Google" },
  ]

  return (
    <Form<S> {...props} initialValues={processedInitialValues}>
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

      <LabeledTextField
        name="categoryIds"
        label="Categories"
        isSelect={true}
        disabled={false}
        options={categoryOptions}
        multiple={true}
      />

      <LabeledTextField
        name="tagIds"
        label="Tags"
        isSelect={true}
        disabled={false}
        options={tagOptions}
        multiple={true}
      />

      <LabeledTextField
        name="techStackIds"
        label="Tech Stack"
        isSelect={true}
        disabled={false}
        options={techStackOptions}
        multiple={true}
      />

      <LabeledCheckbox name="isResellAllowed" label="Is Resell Allowed" defaultChecked={true} />
      <LabeledCheckbox name="isApproved" label="Is Approved" defaultChecked={true} />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
