FROM node:18-alpine AS base

# Cài đặt các phụ thuộc cần thiết
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Cài đặt Prisma CLI
RUN npx prisma generate

# Build ứng dụng
COPY . .
RUN npm run build

# Sản phẩm cho giai đoạn production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=base /app/public ./public

# Cấu trúc thư mục Next.js quan trọng với phân quyền phù hợp
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]