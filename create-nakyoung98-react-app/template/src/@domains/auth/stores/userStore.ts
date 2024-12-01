import { create } from "zustand";
import { UserActions, UserState } from "../types/userStore.type";

export const userStore = create<UserState & UserActions>()((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),
}));
