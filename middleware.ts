import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/ai-chef", "/account"];
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/explore",
  "/forgot-password",
  "/verify",
  "/recipes",
];

const authRedirectRoutes = ["/login", "/signup", "/forgot-password", "/verify"];

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const shouldRedirectAuth = authRedirectRoutes.includes(path);
  const isAuthenticated = session;

  if (isProtectedRoute && !isAuthenticated) {
    console.debug("Redirecting to login - not authenticated");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (
    shouldRedirectAuth &&
    isAuthenticated &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    console.log(isProtectedRoute, isPublicRoute, path);
    console.debug(
      "Redirecting to dashboard - authenticated user on auth route"
    );
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
