import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  if (request.url.endsWith('/account')&&!request.cookies.get('token')){
     return NextResponse.redirect(new URL('/login', request.url));
  }
  // 请求中间件
}
