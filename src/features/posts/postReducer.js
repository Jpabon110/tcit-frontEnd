import { createReducer } from '@reduxjs/toolkit';
import { fetchPosts, createPost, deletePost, updatePost } from './postActions.js';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  filter: '',
};

const postsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
    })
    .addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error al obtener los posts';
    })
    .addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload.data);
      state.loading = false;
    })
    .addCase(createPost.rejected, (state) => {
      state.loading = false;
      state.error = 'Error al crear el posts';
    })
    .addCase(updatePost.rejected, (state) => {
      state.loading = false;
      state.error = 'Error al crear el posts';
    })
    .addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;

      const updatedPost = action.payload.data;
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);

      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    })
    .addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(post => post.id !== action.payload);
    })
    .addCase(deletePost.rejected, (state) => {
      state.loading = false;
      state.error = 'Error al eliminar el posts';
    })
});

export default postsReducer;
