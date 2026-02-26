




import { Routes, Route, Navigate } from "react-router-dom";
import { SnippetProvider } from "./context/snippetContext";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import VerifyOTP from "./pages/verifyOtp";   
import Dashboard from "./pages/Dashboard";
import Folder from "./pages/folder";
import About from "./pages/About";
import ProtectedRoute from "./routes/protectedRoute";

export default function App() {
  return (
    <SnippetProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} /> {/* ✅ NEW */}
        <Route path="/about" element={<About />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/folders"
          element={
            <ProtectedRoute>
              <Folder />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SnippetProvider>
  );
}