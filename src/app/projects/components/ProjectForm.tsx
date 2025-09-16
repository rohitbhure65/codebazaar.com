import React, { Suspense } from "react";
import { Form, FormProps } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";

import { z } from "zod";
import getUsers from "src/app/users/queries/getUsers";
import { usePaginatedQuery } from "@blitzjs/rpc";
export { FORM_ERROR } from "src/app/components/Form";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const [{
    users: users
  }] = usePaginatedQuery(getUsers, {
    orderBy: {
      id: "asc"
    }
  });

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
      <LabeledTextField
        name="isResellAllowed"
        label="Is Resell Allowed"
        placeholder="Is Resell Allowed"
        type="text"
      />
      <LabeledTextField
        name="isApproved"
        label="Is Approved"
        placeholder="Is Approved"
        type="text"
      />

      <LabeledTextField name="id" label="USER ID" isSelect={true} options={users} />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
