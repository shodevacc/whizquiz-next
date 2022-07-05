import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'
import { getCookies, getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next';


const secret = process.env.SECRET;

export default function middleware(req, res) {

    const token = req.cookies.get('token');
    // console.log("COOKIE",token, req.url)
    const url = req.url;
    if (url.includes('/admin')) {
        if (url.includes('/login')) {
            return NextResponse.next()
        }
        if (token === undefined) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`)
        }

        try {
            jwtVerify(token, secret)
            return NextResponse.next()
        }
        catch (e) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`)
        }
    }

    return NextResponse.next()
}