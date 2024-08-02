// src/app/auth/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false); // Set to false for initial login form
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login"; // Adjusted for correct endpoints
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const { token } = await response.json();
      if (token) {
        document.cookie = `token=${token}; path=/`;
        router.push("/Chat");
      }
    } else {
      // Handle error (e.g., show message to user)
      alert("Authentication failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {isRegistering && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />{" "}
        <br />
        <button className="bg-black rounded text-white" type="submit">
          {isRegistering ? "Register" : "Login"}
        </button>
        <br />
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </button>
      </form>
    </div>
  );
}
