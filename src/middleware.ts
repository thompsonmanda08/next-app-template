import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from './lib/session';

const PUBLIC_ROUTES = ['/', '/login', '/register', '/support', '/docs'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone(); // REQUIRED FOR BASE ABSOLUTE URL
  const response = NextResponse.next();
  const session = await getServerSession();

  const urlRouteParams = pathname.match(/^\/dashboard\/([^\/]+)\/?$/);
  const accessToken = session?.accessToken || '';

  // Exclude public assets like icons, manifest, and images
  if (
    pathname.startsWith('/web-app-manifest') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/manifest.json')
  ) {
    return NextResponse.next();
  }

  // CHECK FOR  ROUTES
  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  const isDashboardRoute = pathname == '/dashboard';

  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_ROUTES.some((prefix) => pathname.startsWith(prefix));

  // if (pathname == '/') return response;
  // if (isPublicRoute && !accessToken) return response;

  // // IF NO ACCESS TOKEN AT ALL>>> REDIRECT BACK TO AUTH PAGE
  // if (!accessToken && !isPublicRoute) {
  //   url.pathname = '/login';

  //   // url.searchParams.set("callbackUrl", pathname);

  //   return NextResponse.redirect(url);
  // }

  // // IF THERE IS AN ACCESS TOKEN EXISTS - REDIRECT TO DASHBOARD
  // if ((accessToken && isAuthPage) || isDashboardRoute) {
  //   url.pathname = `/workspaces`;

  //   return NextResponse.redirect(url);
  // }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|web-app-manifest-192x192.png|web-app-manifest-512x512.png|manifest.json).*)',
  ],
};
