import { createContext, useContext, useEffect, useState } from "react";
import {
  getMySnippets,
  createSnippet,
  deleteSnippet,
  updateSnippet,
} from "../api/snippetApi";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    codeLanguage: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchSnippets = async (customFilters = {}) => {
    try {
      setLoading(true);

      const finalFilters = {
        page,
        limit,
        ...filters,
        ...customFilters,
      };

      const data = await getMySnippets(finalFilters);

      setSnippets(data.snippets);
      setTotal(data.total);

    } catch (error) {
      console.error("Fetch Snippets Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (snippetData) => {
    try {
      const newSnippet = await createSnippet(snippetData);

    
      setSnippets((prev) => [newSnippet, ...prev]);

    } catch (error) {
      console.error("Create Snippet Error:", error);
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await deleteSnippet(id);

      setSnippets((prev) => prev.filter((s) => s._id !== id));

    } catch (error) {
      console.error("Delete Snippet Error:", error);
    }
  };

  
  const handleUpdate = async (id, updatedData) => {
    try {
      const updatedSnippet = await updateSnippet(id, updatedData);

      setSnippets((prev) =>
        prev.map((s) =>
          s._id === id ? updatedSnippet : s
        )
      );

    } catch (error) {
      console.error("Update Snippet Error:", error);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [page]);

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        loading,
        page,
        setPage,
        total,
        limit,
        filters,
        setFilters,
        fetchSnippets,
        handleCreate,
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippet = () => useContext(SnippetContext);
