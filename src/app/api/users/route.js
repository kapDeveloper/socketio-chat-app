import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/dbConnect";
import { verifyToken } from "@/lib/jwt"; // Make sure you have this function implemented

export async function GET(req) {
  await connectDB();

  // Extract the JWT token from the Authorization header
  const authHeader = req.headers.get("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";

  // Verify the token and get the user ID
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Find all users excluding the current logged-in user
  const users = await User.find({ _id: { $ne: decoded.id } });

  // Return the list of users
  return NextResponse.json(users, { status: 200 });
}
