
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios.js";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (res.data.success) {
//         navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
//       } else {
//         setError(res.data.message || "Registration failed");
//       }

//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message ||
//         "Registration Failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
//       <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Create Account
//         </h1>

//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg font-semibold text-white transition ${
//               loading
//                 ? "bg-indigo-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "Sending OTP..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-indigo-600 font-medium cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Registration successful → redirect to login
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}