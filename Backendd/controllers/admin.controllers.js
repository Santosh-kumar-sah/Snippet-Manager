import {User} from "../models/user.models.js";
import {Snippet} from "../models/snippet.models.js";
import {Folder} from "../models/folder.models.js";

const adminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalSnippets,
      publicSnippets,
      privateSnippets,
      deletedSnippets,
      totalFolders
    ] = await Promise.all([
      User.countDocuments(),
      Snippet.countDocuments(),
      Snippet.countDocuments({ isPublic: true, isDeleted: false }),
      Snippet.countDocuments({ isPublic: false, isDeleted: false }),
      Snippet.countDocuments({ isDeleted: true }),
      Folder.countDocuments({ isDeleted: false })
    ]);

    res.status(200).json({
      admin: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role
      },
      users: {
        total: totalUsers
      },
      snippets: {
        total: totalSnippets,
        public: publicSnippets,
        private: privateSnippets,
        deleted: deletedSnippets
      },
      folders: {
        total: totalFolders
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to load admin dashboard",
      error: error.message
    });
  }
};

export { adminDashboard };
