import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Comment } from "../types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
    getComments: builder.query<Comment[], void>({
      query: () => "comments",
    }),
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: ({ id, ...rest }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetCommentsByPostIdQuery,
  useGetCommentsQuery,
  useDeletePostMutation,
  useAddPostMutation,
  useEditPostMutation,
} = postsApi;
