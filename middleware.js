// middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// This config is still needed
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
