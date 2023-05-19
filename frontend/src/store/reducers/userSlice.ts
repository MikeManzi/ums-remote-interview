import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

export interface UserState {
  currentUser: {
    user: User | null;
    accessToken: string;
  };
  users: User[];
}

const initialState: UserState = {
  currentUser: { user: null, accessToken: "" },
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = { ...action.payload };
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = [...action.payload];
    },
    setStatusToPending: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.currentUser.user!.status = "PENDING VERIFICATION";
    },
    logout: (state) => {
      state.currentUser = { user: null, accessToken: "" };
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCurrentUser, setUsers, logout, setStatusToPending } =
  userSlice.actions;

export default userSlice.reducer;
