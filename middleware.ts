import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidObjectIdMongo } from "@/util";
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

    if(req.nextUrl.pathname.startsWith('/api/entries/')){
        const id = req.nextUrl.pathname.replace('/api/entries/','');
        
        if(!isValidObjectIdMongo(id)){
            const url = req.nextUrl.clone();
            url.pathname = '/api/bad-request';
            url.search = `?message=${id} is not a valid MongoID`;
            return NextResponse.rewrite(url);
        }
    }
    

     
     return NextResponse.next();  
    //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  //matcher: '/about/:path*',
  matcher: [
        '/api/entries/:path*'
    ],
}