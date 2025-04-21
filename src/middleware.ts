import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const isPublicPath = ["/signin", "/signup", "/"].includes(path);
  // const token = request.cookies.get("token")?.value || "";
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  // } else {
  //   return NextResponse.redirect(new URL("/signin", request.nextUrl));
  // }
}

// const config = {
//   matcher: ["/", "/signin", "/signup", "/dashboard", "/dashboard/:path*"],
// };

// export default config;
