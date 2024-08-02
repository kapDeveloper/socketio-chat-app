export async function POST(req) {
  // Clear the JWT token from the cookies
  const response = new Response(
    JSON.stringify({ message: "Logged out successfully" }),
    { status: 200 }
  );

  // Clear the token cookie
  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
  );

  return response;
}
