import { combineReducers } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  auth: authReducer,
});

export default rootReducer;
