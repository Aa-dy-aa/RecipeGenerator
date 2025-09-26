"use client";
import { useState } from "react";
import Link from "next/link";

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
        localStorage.setItem("jwt", data.token);
        setMessage("✅ Login successful!");
      } else {
        setMessage(data.error || "❌ Login failed");
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        {/* Left image side */}
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        {/* Right login form */}
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full ml-6">
            <form
              onSubmit={handleLogin}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8"
            >
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Welcome Back 👋
              </h1>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>

              {message && (
                <p className="mt-3 text-sm text-red-500 dark:text-red-400">
                  {message}
                </p>
              )}

              {/* Divider */}
              <div className="my-6 flex items-center">
                <hr className="flex-grow border-gray-300 dark:border-gray-700" />
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300 dark:border-gray-700" />
              </div>

              {/* OAuth buttons */}
              <div className="space-y-3">
                <a
                  href="/auth/google"
                  className="w-full block text-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Login with Google
                </a>
                <a
                  href="/auth/github"
                  className="w-full block text-center bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition"
                >
                  Login with GitHub
                </a>
              </div>

              {/* Register link */}
              <div className="mt-4 text-center">
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline font-medium"
                >
                  New here? Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
