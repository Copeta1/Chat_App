import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    console.log("Incoming cookies:", req.cookies);

    console.log(
      "Incoming token (Cookie):",
      token ? "Token received" : "No token"
    );

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      console.log("Auth Fail: No JWT token found in cookies.");
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);

    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default protectRoute;
