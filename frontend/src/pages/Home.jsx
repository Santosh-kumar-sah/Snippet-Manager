


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    const savedTheme = localStorage.getItem("theme");

    if (user) setUsername(user);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await api.post("/contact", formData);
      setStatus(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-gray-900 dark:to-black min-h-screen text-gray-900 dark:text-white transition-all duration-500">

      {/* ================= NAVBAR (Glassmorphism) ================= */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white/20 dark:bg-black/30 border-b border-white/20 shadow-lg">
        <div className="flex justify-between items-center px-10 py-4">

          <h1 className="text-2xl font-bold">SnippetManager</h1>

          <div className="flex items-center space-x-6">

            <a href="#about" className="hover:text-yellow-300 transition">
              About
            </a>

            <a href="#contact" className="hover:text-yellow-300 transition">
              Contact
            </a>

            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-lg bg-white/30 dark:bg-gray-700 hover:scale-105 transition"
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            {username ? (
              <>
                <span className="font-semibold text-yellow-300">
                  Hello, {username}
                </span>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:scale-110 transition"
                >
                  Dashboard
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:scale-110 transition"
              >
                Login
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.h1
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-6"
        >
          Modern Full Stack Experience 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl text-lg mb-8"
        >
          Secure authentication, animated UI, dark mode, glass design,
          and API powered forms.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, rotateX: 10 }}
          onClick={() => navigate(username ? "/dashboard" : "/login")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-xl"
        >
          {username ? "Go to Dashboard" : "Get Started"}
        </motion.button>
      </section>

      {/* ================= ABOUT ================= */}
     {/* ================= ABOUT ================= */}
<section
  id="about"
  className="py-28 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all duration-500"
>
  <div className="max-w-6xl mx-auto">

    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold mb-6">
        Built for Developers Who Value Efficiency
      </h2>
      <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-8">
        Snippet Manager is a modern full-stack application designed to help
        developers securely store, organize, and retrieve reusable code
        snippets — all in one centralized workspace.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid md:grid-cols-3 gap-10 mb-20">
      
      <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          🔐 Secure by Design
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-7">
          Token-based authentication ensures protected dashboard access
          and secure snippet management for every user.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          📂 Organized Workflow
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-7">
          Create, update, delete, and categorize snippets into folders
          to keep your development workflow structured and efficient.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          ⚡ Fast & Responsive
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-7">
          Built using React, Node, Express, and MongoDB with optimized
          REST APIs and smooth UI interactions.
        </p>
      </div>

    </div>

    {/* Tech Stack Highlight */}
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-12 text-center shadow-xl">
      <h3 className="text-3xl font-bold mb-6">
        Modern MERN Architecture
      </h3>
      <p className="max-w-3xl mx-auto text-lg leading-8 opacity-90">
        Powered by React.js for a dynamic frontend, Node.js & Express.js
        for scalable backend services, MongoDB for flexible data storage,
        and JWT-based authentication for secure user sessions.
      </p>
    </div>

    {/* Mission */}
    <div className="mt-20 text-center">
      <h3 className="text-3xl font-semibold mb-6">
        Our Mission
      </h3>
      <p className="max-w-4xl mx-auto text-lg leading-8 text-gray-600 dark:text-gray-400">
        To streamline developer productivity by eliminating repetitive work
        and providing a secure, organized system for managing reusable code.
        Snippet Manager is built as both a practical productivity tool and
        a demonstration of scalable full-stack architecture.
      </p>
    </div>

  </div>
</section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24 px-10 bg-indigo-600 dark:bg-black text-white">
        <h2 className="text-4xl font-bold text-center mb-10">
          Contact Us
        </h2>

        <form
          onSubmit={handleContact}
          className="max-w-xl mx-auto space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg text-gray-800"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg text-gray-800"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg text-gray-800"
          />

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center mt-4">{status}</p>
          )}
        </form>
      </section>

      <footer className="text-center py-6 bg-black/30">
        © 2026 SnippetManager
      </footer>

    </div>
  );
}