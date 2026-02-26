


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMySnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from "../api/snippetApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const data = await getMySnippets();
      setSnippets(data.snippets);
    } catch (error) {
      console.error("Failed to fetch snippets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  const handleAddOrUpdate = async () => {
    if (!title.trim() || !code.trim()) return;

    try {
      if (editingId) {
        const updatedSnippet = await updateSnippet(editingId, {
          title,
          code,
          codeLanguage,
        });

        setSnippets((prev) =>
          prev.map((snippet) =>
            snippet._id === editingId ? updatedSnippet : snippet
          )
        );

        setEditingId(null);
      } else {
        const newSnippet = await createSnippet({
          title,
          code,
          codeLanguage,
        });

        setSnippets((prev) => [newSnippet, ...prev]);
      }

      setTitle("");
      setCode("");
      setCodeLanguage("javascript");
    } catch (error) {
      console.error("Failed to save snippet:", error);
    }
  };


  const handleEdit = (snippet) => {
    setTitle(snippet.title);
    setCode(snippet.code);
    setCodeLanguage(snippet.codeLanguage || "javascript");
    setEditingId(snippet._id);
  };


  const handleDelete = async (id) => {
    try {
      await deleteSnippet(id);
      setSnippets((prev) =>
        prev.filter((snippet) => snippet._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete snippet:", error);
    }
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-5 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Snippet Manager
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-yellow-500 dark:text-black"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* FORM */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editingId ? "Edit Snippet" : "Add New Snippet"}
          </h2>

          <input
            type="text"
            placeholder="Snippet Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          {/* LANGUAGE SELECTOR */}
          <select
            value={codeLanguage}
            onChange={(e) => setCodeLanguage(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>

          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="6"
            className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white font-mono"
          />

          <button
            onClick={handleAddOrUpdate}
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            {editingId ? "Update Snippet" : "Add Snippet"}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* LIST */}
        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">
            Loading snippets...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSnippets.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No snippets found.
              </p>
            ) : (
              filteredSnippets.map((snippet) => (
                <div
                  key={snippet._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
                >
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                    {snippet.title}
                  </h3>

                  <p className="text-sm text-blue-500 mb-3">
                    {snippet.codeLanguage}
                  </p>

                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                    <code>{snippet.code}</code>
                  </pre>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(snippet)}
                      className="px-4 py-1 bg-yellow-400 text-black rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(snippet._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;