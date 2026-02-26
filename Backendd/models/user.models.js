import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // important: password not returned by default
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
     isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpiry: Date
  },
 
  { timestamps: true }
);

/* ----------------------------------
   PASSWORD HASHING (PRE-SAVE HOOK)
----------------------------------- */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


/* ----------------------------------
   COMPARE PASSWORD (LOGIN)
----------------------------------- */
userSchema.methods.comparePassword = async function (enteredPassword) {
  
  
  
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ----------------------------------
   GENERATE JWT TOKEN
----------------------------------- */
// userSchema.methods.generateJWT = function () {
//   return jwt.sign(
//     {
//       userId: this._id,
//       email: this.email
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN || "7d"
//     }
//   );
// };

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || "5d" }
  );
};


 const User = mongoose.model("User", userSchema);
 export { User };
