import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    getUserByUsername: builder.query<User[], string>({
      query: (username) => `users?username=${username}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
} = usersApi;