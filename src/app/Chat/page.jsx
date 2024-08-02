"use client";

import isAuth from "@/utils/isAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import Chat from "@/components/Chat";
const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
    const fetchUsers = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1];

        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!isMounted) return null; // Prevent mismatches by rendering null on the server

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}. You are not logged in.</p>;

  return (
    <main className="flex">
      <aside className="flex flex-col gap-5 h-screen bg-red-100">
        <h2>Sidebar</h2>
        <div className="flex flex-col flex-wrap">
          {users?.map((user) => (
            <div key={user._id} className="flex gap-5">
              <Link href="#">{user.name}</Link>
            </div>
          ))}
        </div>
      </aside>
      <section className="bg-green-200 h-screen w-screen">
        <h1 className="text-xl text-center">Chats</h1>
        <Chat />
      </section>
    </main>
  );
};

export default isAuth(ChatPage);
