import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIES = [
    "__Secure-better-auth.session_token",
    "better-auth.session_token",
];

export default function proxy(request: NextRequest) {
    const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
    const { pathname } = request.nextUrl;


    if (pathname === "/login" || pathname === "/register") {
        return hasSession
            ? NextResponse.redirect(new URL("/", request.url))
            : NextResponse.next();
    }


    if (!hasSession) {
        const url = new URL("/login", request.url);
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/add-studio/:path*",
        "/my-listings/:path*",
        "/my-bookings/:path*",
        "/studios/edit/:path*",
        "/login",
        "/register",
    ],
};