import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import { z } from "zod";
export { FORM_ERROR } from "src/app/components/Form";

import { useCurrentUser } from "src/app/users/hooks/useCurrentUser";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const currentUser = useCurrentUser();

  const initialValues = props.initialValues || { userId: currentUser?.id };

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
        placeholder="Category"
        type="text"
      />
      <LabeledTextField
        name="projectImage"
        label="Project Image"
        placeholder="Project Image"
        type="text"
      />
      <LabeledTextField
        name="projectImages"
        label="Project Images"
        placeholder="project Images"
        type="text"
      />
      <LabeledTextField
        name="tags"
        label="Tags"
        placeholder="Tags"
        type="text"
      />

      <LabeledTextField
        name="techStack"
        label="Tech Stack"
        placeholder="Tech Stack"
        type="text"
      />
      <LabeledTextField
        name="fileUrl"
        label="File Url"
        placeholder="File Url"
        type="text"
      />
      <LabeledTextField
        name="price"
        label="Price"
        placeholder="Price"
        type="number"
      />
      <LabeledTextField
        name="slug"
        label="Slug"
        placeholder="Slug"
        type="text"
      />

      <LabeledCheckbox name="isResellAllowed" label="Is Resell Allowed" defaultChecked={true} />
      <LabeledCheckbox name="isApproved" label="Is Approved" defaultChecked={true} />
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
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
