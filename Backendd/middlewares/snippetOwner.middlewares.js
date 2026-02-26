import { Snippet } from "../models/snippet.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isSnippetOwnerOrAdmin = asyncHandler(async (req, res, next) => {
  const snippetId = req.params.id;

  const snippet = await Snippet.findById(snippetId);

  if (!snippet) {
    throw new ApiError(404, "Snippet not found");
  }

 
  if (req.user.role === "admin") {
    req.snippet = snippet;
    return next();
  }


  if (snippet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to access this snippet");
  }

  
  req.snippet = snippet;
  next();
});

export { isSnippetOwnerOrAdmin };
