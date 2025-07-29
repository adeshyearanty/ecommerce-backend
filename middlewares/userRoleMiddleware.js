import { UnauthorizedException } from "../utils/errorCodes.js";

export function userRoleMiddleware(role) {
  return function (req, _res, next) {
    if (role !== req.user.role) {
      next(new UnauthorizedException("You are not authorized"));
    }
    next();
  };
}
