import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

folderSchema.index({ owner: 1 });
folderSchema.index({ owner: 1, name: 1 }, { unique: true });

 const Folder = mongoose.model("Folder", folderSchema);

 export { Folder };
