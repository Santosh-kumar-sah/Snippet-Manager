import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";




  const protect = asyncHandler(async (req, res, next) => {
  let token;


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

 

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);


  req.user = await User.findById(decoded._id).select("-password");
 

  if (!req.user) {
    throw new ApiError(401, "User no longer exists");
  }

  next();
});



const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Access denied. Required role: ${roles.join(", ")}`
      );
    }

    next();
  };
};



export { protect, authorize };
