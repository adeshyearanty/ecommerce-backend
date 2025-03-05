import { JWT_SECRET } from "../config/config.js";
import { UnauthorizedException } from "../utils/errorCodes.js";
import jwt from "jsonwebtoken";

export function authMiddleware(publicRoutes = []) {
  return async function (req, _res, next) {
    const url = req.url.replace("/", "").replace(/\//g, ".");
    if (publicRoutes.includes(url)) return next();

    const token = req.headers?.authorization?.split(" ")[1] || null;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return next(new UnauthorizedException("Unable to verify token"));
        }
        if (decoded) {
          req.user = decoded;
          return next();
        }
      });
    } else {
      next(new UnauthorizedException("Please login first"));
    }
  };
}
