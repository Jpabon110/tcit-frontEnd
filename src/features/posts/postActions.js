import { createAsyncThunk } from "@reduxjs/toolkit";

export let BASE_URL = import.meta.env?.VITE_URL_SIGNIN || "http://localhost:3000";



const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(`${BASE_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  if (response.status === 401) {
    throw new Error("401");
  }

  if (!response.ok) {
    throw new Error("Error al obtener posts");
  }
  return response.json();
});

export const createPost = createAsyncThunk("posts/createPost", async (newPost) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(newPost),
  });
    if (response.status === 401) {
    throw new Error("401");
  }

  if (!response.ok) {
    throw new Error("Error al crear post");
  }
  return response.json();
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  if (response.status === 401) {
    throw new Error("401");
  }

  if (!response.ok) {
    throw new Error("Error al actualizar post");
  }
    return response.json();
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
    if (response.status === 401) {
    throw new Error("401");
  }

  if (!response.ok) {
    throw new Error("Error al eliminar post");
  }
  return id;
});
