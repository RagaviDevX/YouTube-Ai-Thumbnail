let prisma: any

if (typeof window === "undefined") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require("@prisma/client")
    const globalForPrisma = globalThis as any
    prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] })
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
  } catch {
    // Build-time stub — Prisma not available without DB connection
    prisma = new Proxy({}, {
      get: () => new Proxy(() => Promise.resolve(null), {
        get: () => new Proxy(() => Promise.resolve(null), { get: () => () => Promise.resolve(null) }),
        apply: () => Promise.resolve(null),
      }),
    })
  }
}

export { prisma }
