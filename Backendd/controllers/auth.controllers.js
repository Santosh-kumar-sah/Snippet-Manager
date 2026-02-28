import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
// import { generateOTP } from "../utils/otp.js";
// import { sendEmail } from "../utils/mailer.js";




// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     throw new ApiError(400, "All fields are required");
//   }

//   let user = await User.findOne({ email });

//   if (user && user.isVerified) {
//     throw new ApiError(400, "User already exists");
//   }

//   const otp = generateOTP();
//   const otpExpiry = Date.now() + 10 * 60 * 1000;

//   if (!user) {
//     user = await User.create({
//       name,
//       email,
//       password,
//       otp,
//       otpExpiry
//     });
//   } else {
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();
//   }

//   await sendEmail(
//     email,
//     "Verify Your Account",
//     `<h2>Your OTP: ${otp}</h2><p>Valid for 10 minutes</p>`
//   );

//   res.status(200).json(
//     new ApiResponse(200, {}, "OTP sent to email")
//   );
// });




// const verifyOtp = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new ApiError(400, "User not found");
//   }

//   if (user.otp !== otp) {
//     throw new ApiError(400, "Invalid OTP");
//   }

//   if (user.otpExpiry < Date.now()) {
//     throw new ApiError(400, "OTP expired");
//   }

//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpiry = undefined;

//   await user.save();

//   res.status(200).json(
//     new ApiResponse(200, {}, "Account verified successfully")
//   );
// });


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // 1️⃣ Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // 2️⃣ Hash password (only if you don't already hash in model pre-save hook)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3️⃣ Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // 4️⃣ Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  

  // 5️⃣ Send response
  res.status(201).json(
    new ApiResponse(201, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, "User registered successfully")
  );
});




const loginUser = asyncHandler(async (req, res) => {
 

  const { email, password } = req.body;
  


  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

 
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }


  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }


  const token = user.generateJWT();

  user.password = undefined;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        token
      },
      "Login successful"
    )
  );
});

const getCurrentUser = (req, res) => {
  res.status(200).json(req.user);
};




export { registerUser, loginUser, getCurrentUser };