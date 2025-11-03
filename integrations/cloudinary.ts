import { v2 as cloudinary } from "cloudinary"

// Ensure required env vars are present at runtime. We avoid throwing at import
// time in Next to not break build-time env inspection; validate on first use.
let isConfigured = false

function configureIfNeeded() {
  if (isConfigured) return
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
    )
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
  isConfigured = true
}

export function getCloudinary() {
  configureIfNeeded()
  return cloudinary
}

export type CloudinaryUploadOptions = {
  folder?: string
  publicId?: string
  overwrite?: boolean
}

export async function uploadBuffer(
  buffer: Buffer,
  opts: CloudinaryUploadOptions = {}
): Promise<{ url: string; publicId: string }> {
  const cld = getCloudinary()
  const folder = opts.folder || process.env.CLOUDINARY_FOLDER || "codebazaar/projects"

  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      { folder, public_id: opts.publicId, overwrite: opts.overwrite },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve({ url: (result.secure_url as string) || result.url, publicId: result.public_id })
      }
    )
    stream.end(buffer)
  })
}

export async function deleteByPublicId(publicId: string): Promise<void> {
  const cld = getCloudinary()
  await cld.uploader.destroy(publicId)
}

export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const uploadIndex = url.indexOf("/upload/")
    if (uploadIndex === -1) return null
    let tail = url.substring(uploadIndex + "/upload/".length)
    // remove transformations or version prefix like v1699999999/
    tail = tail.replace(/^v\d+\//, "")
    // strip query params if any
    tail = tail.split("?")[0]
    // remove extension
    const lastDot = tail.lastIndexOf(".")
    if (lastDot > -1) tail = tail.substring(0, lastDot)
    return tail || null
  } catch {
    return null
  }
}
