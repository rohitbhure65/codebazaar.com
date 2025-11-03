import React, { Suspense, useState, useEffect } from "react";
import { Form, FormProps } from "src/app/components/ProjectForm";
import { LabeledTextField } from "src/app/components/LabeledTextField";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import { z } from "zod";
import { useForm } from "react-final-form";
export { FORM_ERROR } from "src/app/components/ProjectForm";

import { useCurrentUser } from "src/app/users/hooks/useCurrentUser";
import { useCategory } from "../../hooks/getCategory";
import { useTags } from "../../hooks/getTags";
import { useTechStack } from "../../hooks/getTechStack";

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const currentUser = useCurrentUser(); 
  const categoriesData = useCategory();
  const tagsData = useTags();
  const techStacksData = useTechStack();

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
      {/* Cloudinary Uploaders */}
      <CloudinaryUploadHelpers />
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

function CloudinaryUploadHelpers() {
  const form = useForm();
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [coverLocalPreview, setCoverLocalPreview] = useState<string | null>(null);
  const [galleryLocalPreviews, setGalleryLocalPreviews] = useState<string[]>([]);

  // revoke object URLs when they change
  useEffect(() => {
    return () => {
      if (coverLocalPreview) URL.revokeObjectURL(coverLocalPreview);
      galleryLocalPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [coverLocalPreview, galleryLocalPreviews]);

  async function uploadFiles(files: File[]): Promise<{ url: string; publicId: string }[]> {
    const body = new FormData();
    for (const f of files) body.append("file", f);
    const res = await fetch("/api/upload", { method: "POST", body });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    return (json.uploads || []) as { url: string; publicId: string }[];
  }

  async function deleteByPublicId(publicId: string) {
    await fetch("/api/upload/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  }

  function extractPublicIdFromUrl(url: string): string | null {
    try {
      const idx = url.indexOf("/upload/");
      if (idx === -1) return null;
      let tail = url.substring(idx + "/upload/".length);
      tail = tail.replace(/^v\d+\//, "");
      tail = tail.split("?")[0];
      const dot = tail.lastIndexOf(".");
      if (dot > -1) tail = tail.substring(0, dot);
      return tail || null;
    } catch {
      return null;
    }
  }

  const currentCover = (form.getState().values["projectImage"] as string | undefined) || null;
  const currentGalleryRaw = form.getState().values["projectImages"] as string[] | string | undefined;
  const currentGallery: string[] = Array.isArray(currentGalleryRaw)
    ? currentGalleryRaw
    : typeof currentGalleryRaw === "string" && currentGalleryRaw
    ? currentGalleryRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="col-span-full grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Current Cover</label>
          {currentCover ? (
            <img src={currentCover} alt="Current cover" className="w-full max-w-xs rounded-md border" />
          ) : (
            <span className="text-xs text-gray-500">No cover set</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Uploading Cover Preview</label>
          {coverLocalPreview ? (
            <img src={coverLocalPreview} alt="New cover preview" className="w-full max-w-xs rounded-md border" />
          ) : (
            <span className="text-xs text-gray-500">Choose an image to preview</span>
          )}
        </div>
        <div className="sm:col-span-2 flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const localUrl = URL.createObjectURL(f);
              if (coverLocalPreview) URL.revokeObjectURL(coverLocalPreview);
              setCoverLocalPreview(localUrl);
              const previousUrl = currentCover;
              try {
                setUploadingCover(true);
                const uploads = await uploadFiles([f]);
                const newUrl = uploads[0]?.url;
                if (newUrl) form.change("projectImage", newUrl);
                // delete previous cover from Cloudinary after successful upload
                if (previousUrl) {
                  const pubId = extractPublicIdFromUrl(previousUrl);
                  if (pubId) await deleteByPublicId(pubId);
                }
              } finally {
                setUploadingCover(false);
              }
            }}
            disabled={uploadingCover}
          />
          {uploadingCover && <span className="text-xs text-gray-500">Uploading cover...</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Current Gallery</label>
        {currentGallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentGallery.map((u, i) => (
              <img key={u + i} src={u} alt={`Gallery ${i + 1}`} className="w-full rounded-md border" />
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-500">No gallery images</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Uploading Gallery Previews</label>
        {galleryLocalPreviews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {galleryLocalPreviews.map((u, i) => (
              <img key={u + i} src={u} alt={`Uploading ${i + 1}`} className="w-full rounded-md border" />
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-500">Choose images to preview</span>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;
            // set local previews
            galleryLocalPreviews.forEach((u) => URL.revokeObjectURL(u));
            try {
              setUploadingGallery(true);
              const uploads = await uploadFiles(files);
              const urls = uploads.map((u) => u.url).filter(Boolean);
              const current = form.getState().values["projectImages"] as string[] | string | null | undefined;
              const currentArr = Array.isArray(current)
                ? current
                : typeof current === "string" && current
                ? current.split(",").map((s) => s.trim()).filter(Boolean)
                : [];
              const next = [...currentArr, ...urls];
              form.change("projectImages", next.join(", "));
            } finally {
              setUploadingGallery(false);
            }
          }}
          disabled={uploadingGallery}
        />
        {uploadingGallery && <span className="text-xs text-gray-500">Uploading gallery...</span>}
      </div>
    </div>
  );
}
