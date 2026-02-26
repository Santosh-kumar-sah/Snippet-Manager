import { ApiError } from "../utils/apiError.js";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not allowed to access this resource");
    }
    next();
  };
};

export { authorizeRoles };
