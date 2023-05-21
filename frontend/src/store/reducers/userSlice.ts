import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

export interface UserState {
  currentUser: {
    user: User | null;
    accessToken: string;
  };
  users: User[];
  request: User | null;
}

const initialState: UserState = {
  currentUser: { user: null, accessToken: "" },
  users: [],
  request: null,
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
    changeToVerified: (state, action: PayloadAction<string>) => {
      const i = state.users.findIndex((x) => x.id === action.payload);
      if (i) {
        state.users[i].status = "VERIFIED";
      }
    },
    logout: (state) => {
      state.currentUser = { user: null, accessToken: "" };
      localStorage.removeItem("accessToken");
    },
    setRequest: (state, action: PayloadAction<any>) => {
      state.request = { ...action.payload };
    },
  },
});

export const {
  setCurrentUser,
  setUsers,
  logout,
  setStatusToPending,
  setRequest,
  changeToVerified,
} = userSlice.actions;

export default userSlice.reducer;
