"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registered successfully! Please login.");
      } else {
        setMessage(data.error || "❌ Registration failed");
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px] animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-2">
          🍳  Recipe Generator
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Discover recipes made just for you!
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
