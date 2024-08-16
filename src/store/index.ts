import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import { usersApi } from "../services/userApi"; 
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";

declare global {
  interface Window {
    Cypress?: any;
  }
}

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    posts: postsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
});

if (window.Cypress && process.env.NODE_ENV === "development") {
  (window as any).store = store;
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
