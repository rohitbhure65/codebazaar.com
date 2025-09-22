import { enhancePrisma } from "blitz"              // Blitz helper to extend Prisma
import { PrismaClient } from "@prisma/client"      // PrismaClient from generated client

const EnhancedPrisma = enhancePrisma(PrismaClient) // Wrap PrismaClient with Blitz enhancements

export * from "@prisma/client"                     // Re-export Prisma models & types
const db = new EnhancedPrisma()                    // Create single Prisma client instance
export default db                                  // Export Prisma client for global use
