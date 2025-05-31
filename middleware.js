import { NextResponse } from 'next/server';

export function middleware(req) {
  const userAccessing = req.nextUrl.pathname;

  const cookie = req.cookies.get('userSession');
  const hasSession = !!cookie;

  const publicRoutes = ['/auth'];
  const isPublic = publicRoutes.some((path) =>
    userAccessing.startsWith(path)
  );


  if (!hasSession && !isPublic) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if(isPublic && hasSession){
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/billing',
    '/settings',
    '/all-interview',
    '/scheduled-interview',
    '/auth',
  ],
};
