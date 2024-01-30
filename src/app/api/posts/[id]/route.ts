import prisma from "@/lib/db";

import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } } ) {
    console.log("REP-DELETE");
    
    const user = await getCurrentUser();  
    try {
      if (!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
      }
      console.log("TEST-DELETE",req.body, req.nextUrl.searchParams);
      
      const id = params.id
  
      // Check if the user is the author of the post
      const post = await prisma.post.findUnique({
        where: {
          id: id as string,
        },
        select: {
          authorEmail: true,
        },
      });
  
      if (!post || post.authorEmail !== user.email) {
        return NextResponse.json({ message: 'Unauthorized!' }, { status: 403 });
      }
  
      // Delete the post
      await prisma.post.delete({
        where: {
          id: id as string,
        },
      });
  
      return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }
  }