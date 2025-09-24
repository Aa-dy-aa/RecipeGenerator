import express from "express";
import next from "next";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; // ← Add this import
import { initAuth } from "seedhe-auth";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  await app.prepare();
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  // Initialize auth
  const { authService, authRoutes } = await initAuth();
  server.use("/auth", authRoutes);

  // Protected route with manual JWT verification
  server.get("/api/secret", (req, res) => {
    const token = req.cookies.token;

    console.log("Token received:", token ? "Present" : "Missing"); // Debug log

    if (!token) {
      return res.status(401).json({ message: "❌ Not logged in" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Token decoded:", decoded); // Debug log

      res.json({
        id: decoded.id,
        provider: decoded.provider,
        name: decoded.name,
        email: decoded.email,
        photo: decoded.photo,
        message: "jo bhi padhe sabh bole seedhe",
      });
    } catch (err) {
      console.log("JWT verification error:", err.message); // Debug log
      return res.status(403).json({ message: "❌ Unauthorized" });
    }
  });

  // Next.js handles other routes
  server.use((req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  );
}

start();
