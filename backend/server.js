import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app as socketApp, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3001;

dotenv.config();

const ALLOWED_ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

socketApp.set("trust proxy", 1);

console.log(`CORS Allowed Origin set to: ${ALLOWED_ORIGIN}`);
console.log(`Is in Production/Deployment mode: ${!!process.env.FRONTEND_URL}`);

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

socketApp.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

socketApp.use(express.json());
app.use(cookieParser());

socketApp.use("/api/auth", authRoutes);
socketApp.use("/api/messages", messageRoutes);
socketApp.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Servers is running on http://localhost:${PORT}`);
});
