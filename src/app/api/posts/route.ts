import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  try {
    if(!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    const { title, content } = await req.json();
    const newPost = await prisma.post.create({
      data: {
        title, content, authorEmail: user.email
      }
    })
    return NextResponse.json({newPost}, { status: 200})

  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}


export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  console.log("REP-get");
  
  try {
    if (!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    const  search = await req.nextUrl.searchParams.get('search');

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { authorEmail: { contains: search ?? '' } },
          { title: { contains: search ?? '' } },
        ],
      },
      include:{author:true}
    });

    return NextResponse.json({ posts }, { status: 200 });

  } catch (error) {
    console.log("Error- api", error);
    
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  console.log("REP-update");
  try {
    if (!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    const { title, content, id } = await req.json();

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

    // Update the post
    const updatedPost = await prisma.post.update({
      where: {
        id: id as string,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

