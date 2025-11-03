import { NextRequest, NextResponse } from "next/server"
import { uploadBuffer } from "../../../../integrations/cloudinary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const files = form.getAll("file").filter(Boolean) as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Missing file field 'file'" }, { status: 400 })
    }

    const uploads: { url: string; publicId: string }[] = []
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const result = await uploadBuffer(buffer)
      uploads.push({ url: result.url, publicId: result.publicId })
    }

    return NextResponse.json({ uploads })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Upload failed" }, { status: 500 })
  }
}
