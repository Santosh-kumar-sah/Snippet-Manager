import mongoose from "mongoose";

const snippetVersionSchema = new mongoose.Schema(
  {
    snippetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true
    },

    code: {
      type: String,
      required: true
    },

    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    editedAt: {
      type: Date,
      default: Date.now
    }
  }
);

// indexes
snippetVersionSchema.index({ snippetId: 1 });
snippetVersionSchema.index({ editedAt: -1 });

 const SnippetVersion = mongoose.model(
  "SnippetVersion",
  snippetVersionSchema
);

export {SnippetVersion}