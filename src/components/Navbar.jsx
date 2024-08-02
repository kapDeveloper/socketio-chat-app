"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    setToken(tokenFromCookies); // Set token after component mounts
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to login page or home page
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-around items-center sticky top-0 z-50 bg-red-200 flex-wrap">
      <h1 className="text-3xl">Kappy Chat</h1>
      <div className="flex gap-5">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          <Link href="/Chat">Chat</Link>
        </div>
        {token ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
