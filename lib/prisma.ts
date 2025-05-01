import { PrismaClient } from '@prisma/client';

// Declare global variable type
declare global {
  var prisma: PrismaClient | undefined;
}

// Create or reuse existing PrismaClient instance
export const prisma = global.prisma || new PrismaClient({
  log: ['error', 'warn'],
});

// In development, attach prisma to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;