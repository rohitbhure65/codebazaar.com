import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import { z } from "zod";
import getUsersWithoutProjects from "src/app/users/queries/getUsersWithoutProjects";
import { usePaginatedQuery } from "@blitzjs/rpc";
export { FORM_ERROR } from "src/app/components/Form";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const [users] = usePaginatedQuery(getUsersWithoutProjects, null);

  return (
    <Form<S> {...props}>
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

       <LabeledCheckbox name="isResellAllowed" label="Is Resell Allowed" defaultChecked={true} />
       <LabeledCheckbox name="isApproved" label="Is Approved" defaultChecked={true} />

      <LabeledTextField name="userId" label="USER ID" isSelect={true} options={users.map(user => ({ value: user.id, label: user.name || user.email }))} />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
