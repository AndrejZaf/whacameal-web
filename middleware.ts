import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = await getCookieCache(request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
