import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        userId: number;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
