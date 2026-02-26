import { Folder } from "../models/folder.models.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import { Snippet } from "../models/snippet.models.js";

 
 const createFolder = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const folder = await Folder.create({
    name,
    owner: req.user._id
  });

  res.status(201).json(folder);
});


const getMyFolders = asyncHandler(async (req, res) => {
  const folders = await Folder.find({
    owner: req.user._id,
    isDeleted: false
  }).sort({ createdAt: -1 });

  res.status(200).json(folders);
});


 const updateFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findOne({
    _id: req.params.id,
    owner: req.user._id,
    isDeleted: false
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  folder.name = req.body.name;
  await folder.save();

  res.status(200).json(folder);
});



const deleteFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findOne({
    _id: req.params.id,
    owner: req.user._id,
    isDeleted: false
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  folder.isDeleted = true;
  await folder.save();

  await Snippet.updateMany(
    { folderId: folder._id },
    { $set: { folderId: null } }
  );

  res.status(200).json({ message: "Folder deleted" });
});

export { createFolder, getMyFolders, updateFolder, deleteFolder };
