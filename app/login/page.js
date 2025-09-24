"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.token); // store token
        setMessage("✅ Login successful!");
      } else {
        setMessage(data.error || "❌ Login failed");
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-lg p-6 w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-3 text-sm text-gray-600">{message}</p>

        {/* OAuth logins */}
        <div className="mt-4 space-y-2">
          <a
            href="/auth/google"
            className="w-full block text-center bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Login with Google
          </a>
          <a
            href="/auth/github"
            className="w-full block text-center bg-gray-800 text-white py-2 rounded hover:bg-black"
          >
            Login with GitHub
          </a>
        </div>
      </form>
    </div>
  );
}
