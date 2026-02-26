import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    entity: {
      type: String,
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export { AuditLog };
