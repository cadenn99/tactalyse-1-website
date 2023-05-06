import { NextResponse } from "next/server"

export default function middleware(req) {
    if (req.url.includes('/order'))
        NextResponse.redirect('/')
}