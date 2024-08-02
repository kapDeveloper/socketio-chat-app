// src/app/api/auth/login/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Please add all fields" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
