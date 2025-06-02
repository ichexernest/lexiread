import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/sso-callback'])
const isAdminRoute = createRouteMatcher(['/Admin(.*)'])

export default clerkMiddleware(async(auth, req)=>{
  const {userId} = await auth()

  // if(!isProtectedRoute(req)) await auth.protect()
  if(!userId && !isPublicRoute(req)) {
    //return redirectToSignIn()
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/Check', req.url))
  }

  const sessionClaims = (await auth()).sessionClaims as { metadata?: { role?: string } };
  if(isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
    return NextResponse.redirect(new URL("/Home", req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}