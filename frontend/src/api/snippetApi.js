import api from "./axios";

export const getMySnippets = async (params = {}) => {
  const { data } = await api.get("/snippets", { params });
  return data;
};
export const createSnippet = async (snippetData) => {
  const { data } = await api.post("/snippets", snippetData);
  return data.snippet;   
};
export const deleteSnippet = async (id) => {
  const { data } = await api.delete(`/snippets/${id}`);
  return data;
};

export const updateSnippet = async (id, snippetData) => {
  const { data } = await api.put(`/snippets/${id}`, snippetData);
  return data.snippet;
};
