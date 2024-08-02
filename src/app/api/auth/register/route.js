// src/app/api/auth/register/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "Please add all fields" }), {
      status: 400,
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }

  const user = await User.create({ name, email, password });

  return new Response(JSON.stringify(user), { status: 201 });
}
