import { NextRequest, NextResponse } from "next/server"
import { deleteByPublicId } from "../../../../../integrations/cloudinary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json()
    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json({ error: "publicId is required" }, { status: 400 })
    }
    await deleteByPublicId(publicId)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Delete failed" }, { status: 500 })
  }
}


