import { NextResponse, type NextRequest } from "next/server";
import { EnumTokens } from "./services/auth/auth.token.service";
import { DASHBOARD_URL, PUBLIC_URL } from "./config/url.config";

export async function proxy(request: NextRequest) {
    const accessTokenFromQuery = request.nextUrl.searchParams.get(
        EnumTokens.ACCESS_TOKEN
    );

    if (accessTokenFromQuery) {
        const url = request.nextUrl.clone();
        url.searchParams.delete(EnumTokens.ACCESS_TOKEN);

        const response = NextResponse.redirect(url);
        response.cookies.set(EnumTokens.ACCESS_TOKEN, accessTokenFromQuery, {
            domain: process.env.APP_DOMAIN,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    }

    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

    const isAuthPage = request.url.includes(PUBLIC_URL.auth());

    if (isAuthPage) {
        if (refreshToken) {
            return NextResponse.redirect(new URL(DASHBOARD_URL.home(), request.url));
        }
        return NextResponse.next();
    }

    if (!refreshToken) {
        return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/store",
        "/store/:path*",
        "/auth",
        "/auth/:path*",
    ],
};
