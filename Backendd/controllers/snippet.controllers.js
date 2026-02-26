import { Snippet } from "../models/snippet.models.js";
import { getSortObject } from "../utils/sort.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { AuditLog } from "../models/auditLog.models.js";
import { Folder } from "../models/folder.models.js";

import {ApiError} from "../utils/ApiError.js";


 const createSnippet = async (req, res) => {
    

  try {
    const { title, code, codeLanguage, tags, folderId, isPublic } = req.body;

    if (!title || !code || !codeLanguage) {
      return res.status(400).json({
        message: "Title, code and language are required"
      });
    }

    const snippet = await Snippet.create({
      title,
      code,
      codeLanguage,
      tags,
      folderId: folderId || null,
      isPublic: isPublic || false,
      owner: req.user._id 
    });

    return res.status(201).json({
      message: "Snippet created successfully",
      snippet
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create snippet",
      error: error.message
    });
  }
};






const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;

    
    const allowedUpdates = [
      "title",
      "code",
      "codeLanguage",
      "tags",
      "folderId",
      "isPublic"
    ];

    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update"
      });
    }

    
    if (updates.folderId) {
      const folder = await Folder.findOne({
        _id: updates.folderId,
        owner: req.user._id,
        isDeleted: false
      });

      if (!folder) {
        return res.status(400).json({
          message: "Invalid folder"
        });
      }
    }

    const updatedSnippet = await Snippet.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
        isDeleted: false
      },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSnippet) {
      return res.status(404).json({
        message: "Snippet not found"
      });
    }

    return res.status(200).json({
      message: "Snippet updated successfully",
      snippet: updatedSnippet
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update snippet",
      error: error.message
    });
  }
};





const deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet || snippet.isDeleted) {
    throw new ApiError(404, "Snippet not found");
  }

  snippet.isDeleted = true;
  snippet.deletedAt = new Date();
  snippet.deletedBy = req.user._id;

  await snippet.save();
   await AuditLog.create({
    action: "DELETE_SNIPPET",
    entity: "Snippet",
    entityId: snippet._id,
    performedBy: req.user._id,
    metadata: {
      title: snippet.title,
      isPublic: snippet.isPublic
    }
  });

  res.status(200).json({
    message: "Snippet deleted successfully"
  });
});








const getMySnippets = async (req, res) => {
  try {
    const { search, isPublic, codeLanguage, tags, sortBy, order, folderId } = req.query;

    const limit = Math.max(Number(req.query.limit) || 10, 1);

    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) page = 1;

    const skip = (page - 1) * limit;

    const filter = {
      owner: req.user._id,
      isDeleted: false
    };

   
if (folderId !== undefined) {
  if (folderId === "null") {
    filter.folderId = null; 
  } else {
    filter.folderId = folderId;
  }
}


    if (search) {
      filter.$text = { $search: search };
    }

    if (isPublic !== undefined) {
      filter.isPublic = isPublic === "true";
    }

    if (codeLanguage) {
      filter.codeLanguage = codeLanguage;
    }

    if (tags) {
      filter.tags = { $in: [tags] };
    }

    const sort = getSortObject(sortBy, order);
    const effectiveSortBy = Object.keys(sort)[0];
    const effectiveOrder = sort[effectiveSortBy] === 1 ? "asc" : "desc";

    const [snippets, total] = await Promise.all([
      Snippet.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort),
      Snippet.countDocuments(filter)
    ]);

   

    res.status(200).json({
        page,
        limit,
        total,
        sortBy: effectiveSortBy,
        order: effectiveOrder,
        snippets
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





const getPublicSnippets = async (req, res) => {
  try {
    const { search, codeLanguage, tags, sortBy, order } = req.query;

    const limit = Math.max(Number(req.query.limit) || 10, 1);

    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) page = 1;

    const skip = (page - 1) * limit;

    const filter = { isPublic: true ,isDeleted: false};

    if (search) {
      filter.$text = { $search: search };
    }

    if (codeLanguage) {
      filter.codeLanguage = codeLanguage;
    }

    if (tags) {
      filter.tags = { $in: [tags] };
    }

    const sort = getSortObject(sortBy, order);
    const effectiveSortBy = Object.keys(sort)[0];
    const effectiveOrder = sort[effectiveSortBy] === 1 ? "asc" : "desc";


    const [snippets, total] = await Promise.all([
      Snippet.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort),
        
      Snippet.countDocuments(filter)
    ]);

   
  

 
    res.status(200).json({
        page,
        limit,
        total,
        sortBy: effectiveSortBy,
        order: effectiveOrder,
        snippets
});


  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch public snippets",
      error: error.message
    });
  }
};


const restoreSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    throw new ApiError(404, "Snippet not found");
  }

  if (!snippet.isDeleted) {
    throw new ApiError(400, "Snippet is not deleted");
  }

  snippet.isDeleted = false;
  snippet.deletedAt = null;
  snippet.deletedBy = null;

  await snippet.save();


  await AuditLog.create({
    action: "RESTORE_SNIPPET",
    entity: "Snippet",
    entityId: snippet._id,
    performedBy: req.user._id,
    metadata: {
      title: snippet.title
    }
  });

  res.status(200).json({
    message: "Snippet restored successfully",
    snippet
  });
});



export { createSnippet, updateSnippet, deleteSnippet ,getMySnippets, getPublicSnippets, restoreSnippet};

