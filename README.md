This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

### Steps to Deploy:
1. Push your code to GitHub.
2. Connect your GitHub account to [Vercel](https://vercel.com).
3. Import this repository.
4. **Crucial:** Add the following Environment Variables in the Vercel dashboard:
   - `API`: `https://ecommerce.routemisr.com/api/v1`
   - `NEXTAUTH_SECRET`: (Your secret key)
   - `NEXT_URL`: (Your deployment URL, e.g., `https://your-project.vercel.app`)
   - `NEXTAUTH_URL`: (Same as `NEXT_URL`)
5. Click **Deploy**.

### Why not GitHub Pages?
Next.js applications with Server-Side Rendering (SSR) and Authentication require a Node.js server to run. GitHub Pages is for Static Sites only. Vercel provides the necessary environment for Next.js to function fully.

