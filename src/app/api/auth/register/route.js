import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"

export async function POST(request) {
  try {
    const data = await request.json();
    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log("HERE", data, userFound);

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: data.username,
        email: data.email,
        password: data.password,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error in API route /api/register",error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
