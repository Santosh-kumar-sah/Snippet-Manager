


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      
      const { token, user } = response.data.data;

     localStorage.setItem("token", token);
     localStorage.setItem("username", user.name);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

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
         <div className="space-y-1">
  <label className="block text-sm font-medium text-gray-700">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                 outline-none transition duration-200 pr-12"
    />

    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="absolute inset-y-0 right-0 flex items-center pr-3 
                 text-sm text-gray-500 hover:text-indigo-600 
                 transition duration-200"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
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
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}