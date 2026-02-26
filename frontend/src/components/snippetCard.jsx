

import { useState } from "react";
import { useSnippet } from "../context/snippetContext";

const SnippetCard = ({ snippet }) => {
  const { handleDelete, handleUpdate } = useSnippet();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);

  const saveChanges = async () => {
    await handleUpdate(snippet._id, {
      title,
      code,
      codeLanguage: snippet.codeLanguage,
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
      
      {isEditing ? (
        <>
          <input
            className="border p-2 w-full mb-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-2 rounded"
            rows="4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">
            {snippet.title}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            {snippet.codeLanguage}
          </p>

          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-3">
            <code>{snippet.code}</code>
          </pre>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(snippet._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SnippetCard;