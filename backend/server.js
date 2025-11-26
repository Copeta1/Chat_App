import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3001;

dotenv.config();

const ALLOWED_ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

app.set("trust proxy", 1);

console.log(`CORS Allowed Origin set to: ${ALLOWED_ORIGIN}`);
console.log(`Is in Production/Deployment mode: ${!!process.env.FRONTEND_URL}`);

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Servers is running on http://localhost:${PORT}`);
});
