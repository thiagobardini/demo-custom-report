# Configuration
- `pnpm install` to install dependencies
- `pnpm add next react react-dom` to add next.js and react dependencies in the Playwright test project
- `pnpm add react@canary react-dom@canary` to add the latest version of React and React DOM



# Prisma with MongoDB
- `pnpx prisma generate` to generate the Prisma client
- `pnpx prisma studio` to open the Prisma Studio
- `pnpx prisma db push` Whenever you update your Prisma schema, you will need to run the

<!-- https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/#std-label-vercel-access-lists -->

# Clean up the cache and node_modules
pnpm store prune
pnpm rm --recursive node_modules
pnpm install
