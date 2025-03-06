import { JWT_SECRET } from "../config/config.js";
import { UnauthorizedException } from "../utils/errorCodes.js";
import jwt from "jsonwebtoken";

export function authMiddleware(publicRoutes = []) {
  return async function (req, _res, next) {
    let url = req.url;

    // Ensure api-docs routes are properly handled without unwanted replacements
    if (!url.startsWith("/api-docs")) {
      url = url.replace("/", "").replace(/\//g, ".");
    } else {
      url = url.substring(1); // Remove the leading slash
    }

    // Check if the route is in publicRoutes or matches a wildcard route
    if (
      publicRoutes.some(
        (route) =>
          route === url ||
          (route.endsWith(".*") && url.startsWith(route.slice(0, -2)))
      )
    ) {
      return next();
    }

    const token = req.cookies.userLoginToken;
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
