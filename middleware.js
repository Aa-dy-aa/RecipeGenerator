// middleware.js
import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(
  ['/dashboard(.*)']
)

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

// This config is still needed
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
