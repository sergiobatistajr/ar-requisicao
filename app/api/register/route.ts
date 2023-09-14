import { NextResponse } from "next/server";
import prismadb from "@/lib/db/prisma";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, name, password, confirmPassword, role } = body;

    if (!username) new NextResponse("Username is required", { status: 400 });

    if (!name) new NextResponse("Name is required", { status: 400 });

    if (!password) new NextResponse("Password is required", { status: 400 });

    if (!confirmPassword)
      new NextResponse("Confirm Password is required", { status: 400 });

    if (!role) new NextResponse("Role is required", { status: 400 });

    if (password !== confirmPassword)
      new NextResponse("Password does not match", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        username,
        name,
        hashedPassword,
        role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(["REGISTER_POST"], error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
