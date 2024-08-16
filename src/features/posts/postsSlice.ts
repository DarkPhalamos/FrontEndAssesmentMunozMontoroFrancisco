import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types";
import { postsApi } from "../../services/postsApi";

interface PostsState {
  posts: Post[];
  initialized: boolean;
}

const initialState: PostsState = {
  posts: [],
  initialized: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.initialized = true;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const maxId = state.posts.reduce(
        (max, post) => Math.max(max, post.id),
        0
      );
      const newPost = { ...action.payload, id: maxId + 1 };
      state.posts.unshift(newPost);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getPosts.matchFulfilled,
      (state, { payload }) => {
        if (!state.initialized) {
          state.posts = payload;
          state.initialized = true;
        }
      }
    );
  },
});

export const { setPosts, addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
