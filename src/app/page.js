// import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <div className="">
      <h1 className="text-2xl">Welcome To Home</h1>
      {!token ? <Link href="/login">Get Started</Link> : "Connected"}
    </div>
  );
}
