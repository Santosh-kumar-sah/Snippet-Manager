import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true
    },

    codeLanguage: {
      type: String,
      required: true,
      lowercase: true
    },

    tags: {
      type: [String],
      default: []
    },

   owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null
    },

    isPublic: {
      type: Boolean,
      default: false
    },
// Soft delete fields
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);




// Pagination + sorting
snippetSchema.index({ owner: 1, createdAt: -1 });
snippetSchema.index({ isPublic: 1, createdAt: -1 });

// Filters + sorting
snippetSchema.index({ owner: 1, codeLanguage: 1, createdAt: -1 });
snippetSchema.index({ isPublic: 1, codeLanguage: 1, createdAt: -1 });

snippetSchema.index({ owner: 1, tags: 1, createdAt: -1 });
snippetSchema.index({ isPublic: 1, tags: 1, createdAt: -1 });

// Folder-based queries
snippetSchema.index({ folderId: 1, createdAt: -1 });

// Full-text search
snippetSchema.index(
  { title: "text", tags: "text" },
  { weights: { title: 5, tags: 1 } }
);



 const Snippet = mongoose.model("Snippet", snippetSchema);
export { Snippet }; 
